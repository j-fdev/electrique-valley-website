# Moving electriquevalley.com to AWS Lightsail, with no downtime

The old host (104.152.168.32, cPanel) keeps serving the site until the very last step, so visitors see no gap.
The AWS server is `ubuntu@15.156.114.235` (Ubuntu 24.04).

Windows commands are **PowerShell**, run from `C:\Applications_builds\ElectriqueValley\website`.
Server commands are run **in an SSH session** as `ubuntu`. Never use `sudo` with `pm2` or `npm run`.

---

## 0. Before you start (Windows)

```powershell
$KEY = "C:\Applications_builds\ElectriqueValley\Website_Backup\LightsailDefaultKey-ca-central-1.pem"
$SRV = "ubuntu@15.156.114.235"
ssh -i $KEY $SRV "echo connected"
```

If ssh says *UNPROTECTED PRIVATE KEY FILE*, restrict the key to your user once:
`icacls $KEY /inheritance:r /grant:r "$($env:USERNAME):R"`

**Find who manages the DNS** (you need it in steps 6 and 8):

```powershell
nslookup -type=NS electriquevalley.com
```

The name servers tell you where to log in (e.g. `ns1.hostwhitelabel.com` = old host's cPanel "Zone Editor";
`*.domaincontrol.com` = GoDaddy; `*.cloudflare.com` = Cloudflare). Log in there and **lower the TTL of the
`@`, `www` and `api` A records to 300 seconds** now: it makes the switch in step 8 fast.

**Lightsail firewall:** Lightsail console → instance → *Networking* → IPv4 firewall: add **HTTPS (443)**.
(SSH 22 and HTTP 80 are open by default.) Do the same in the IPv6 firewall if it is enabled.

---

## 1. Prepare the server

Upload the deploy files and run the setup script:

```powershell
git archive --format=tar.gz -o "$env:TEMP\ev-server.tar.gz" HEAD server deploy
ssh -i $KEY $SRV "mkdir -p ~/upload ~/apps/electriquevalley"
scp -i $KEY "$env:TEMP\ev-server.tar.gz" "${SRV}:~/upload/"
ssh -i $KEY $SRV
```

On the server:

```bash
cd ~/apps/electriquevalley && tar -xzf ~/upload/ev-server.tar.gz
bash deploy/setup-server.sh
```

It installs Node 22, pm2, ffmpeg and certbot, kills the stray root pm2 daemon and prints the versions.

---

## 2. Database

### 2a. Get into MySQL as root

On Ubuntu, MySQL root normally logs in through the system account, with no password:

```bash
sudo mysql
```

If that works, skip to 2b. If it says *Access denied*, reset the root password
(MySQL on AWS holds no data yet, so stopping it is harmless):

```bash
sudo systemctl stop mysql
sudo mkdir -p /var/run/mysqld && sudo chown mysql:mysql /var/run/mysqld
sudo mysqld_safe --skip-grant-tables --skip-networking &
sleep 5 && sudo mysql -u root
```
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
EXIT;
```
```bash
sudo mysqladmin shutdown   # stops the temporary server
sudo systemctl start mysql
sudo mysql                 # should now work without a password
```

### 2b. Create the database and the app user

Pick a **new** strong password for the app user (a password manager is ideal). Keep the same database name
as in your local `server/.env` (`DB_NAME`) or choose `electriquevalley_db`.

```sql
CREATE DATABASE electriquevalley_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER 'ev_app'@'localhost' IDENTIFIED BY 'CHOOSE-A-STRONG-PASSWORD';
GRANT ALL PRIVILEGES ON electriquevalley_db.* TO 'ev_app'@'localhost';
EXIT;
```

### 2c. Import the data

Best: a **fresh export** from the old cPanel → phpMyAdmin → select the database → *Export* → *Quick*, SQL.
Save it as `Website_Backup\db_backup\electriquevalley_db_<date>.sql`. Otherwise use the September backup.

```powershell
scp -i $KEY "..\Website_Backup\db_backup\electriquevalley_db.sql" "${SRV}:~/upload/db.sql"
```
```bash
mysql -u ev_app -p electriquevalley_db < ~/upload/db.sql
mysql -u ev_app -p electriquevalley_db -e "SELECT COUNT(*) FROM newsletter_subscribers; SELECT COUNT(*) FROM video_capsules;"
rm ~/upload/db.sql          # the dump contains subscriber emails
```

---

## 3. API

Upload the videos and your local `.env`:

```powershell
tar -cf "$env:TEMP\ev-videos.tar" -C server\src\uploads convertedVideos
scp -i $KEY "$env:TEMP\ev-videos.tar" "${SRV}:~/upload/"
scp -i $KEY server\.env "${SRV}:~/apps/electriquevalley/server/.env"
```

On the server:

```bash
cd ~/apps/electriquevalley/server
mkdir -p src/uploads && tar -xf ~/upload/ev-videos.tar -C src/uploads && rm ~/upload/ev-videos.tar
chmod 600 .env
nano .env
```

In `.env`, set:

```
PORT=5000
FRONTEND_URL=https://electriquevalley.com,https://www.electriquevalley.com
BACKEND_URL=https://api.electriquevalley.com
DB_HOST=localhost
DB_PORT=3306
DB_NAME=electriquevalley_db
DB_USER=ev_app
DB_PASSWORD=<the password from 2b>
DB_LOGGING=false
UNSUBSCRIBE_SECRET=<64 random characters, see below>
```

Generate the unsubscribe secret on the server (keep it private; it signs the newsletter unsubscribe links):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Keep `EMAIL_USER`, `EMAIL_PASS` and `ADMIN_EMAIL` as they are. `TOKEN_KEY` is left over from the removed
login code: delete that line.

Build and start:

```bash
npm ci && npm run build
cd ~/apps/electriquevalley
pm2 start deploy/ecosystem.config.js
pm2 logs electriquevalley-api --lines 30 --nostream   # expect "Server listening on port 5000"
curl -s http://127.0.0.1:5000/                        # {"message":"Electrique Valley API is running"}
curl -s http://127.0.0.1:5000/api/videoCapsules | head -c 300
pm2 save
pm2 startup        # prints one "sudo env PATH=... pm2 startup ..." line: copy-paste and run it
```

---

## 4. Website files

On Windows (production build uses `client/.env.production` → `https://api.electriquevalley.com`):

```powershell
# npm run build also pre-renders every page (headless Chrome, about 1 minute) and must end with
# "Pre-rendered 20 pages into build/." If it lists problems (a missing image...), fix them first.
cd client; npm ci; npm run build; cd ..
tar -cf "$env:TEMP\ev-client.tar" -C client\build .
scp -i $KEY "$env:TEMP\ev-client.tar" "${SRV}:~/upload/"
```

On the server:

```bash
tar -xf ~/upload/ev-client.tar -C /var/www/electriquevalley && rm ~/upload/ev-client.tar
ls /var/www/electriquevalley       # index.html, app.html, en/, serie-dmax/, static/, img/ ...
```

The old copy in `/home/ubuntu/electriquevalley.com` is no longer used; delete it only once everything works.

---

## 5. nginx

```bash
sudo cp /etc/nginx/sites-available/electriquevalley ~/electriquevalley.nginx.old   # backup of the broken config
sudo cp ~/apps/electriquevalley/deploy/nginx/electriquevalley.conf /etc/nginx/sites-available/electriquevalley
sudo ln -sf /etc/nginx/sites-available/electriquevalley /etc/nginx/sites-enabled/electriquevalley
sudo nginx -t && sudo systemctl reload nginx
```

Test over HTTP from Windows (DNS still points to the old host, so force the AWS IP):

```powershell
curl.exe -s --resolve www.electriquevalley.com:80:15.156.114.235 http://www.electriquevalley.com/ | Select-Object -First 5
curl.exe -s --resolve api.electriquevalley.com:80:15.156.114.235 http://api.electriquevalley.com/api/videoCapsules
```

---

## 6. HTTPS certificate *before* the switch (DNS challenge)

Let's Encrypt's normal check needs the DNS to already point to AWS. To have HTTPS ready **before** the
switch, prove ownership with TXT records instead:

```bash
sudo certbot certonly --manual --preferred-challenges dns \
  --cert-name electriquevalley.com \
  -d electriquevalley.com -d www.electriquevalley.com -d api.electriquevalley.com
```

Certbot shows one or more `_acme-challenge` TXT values. Add each in the DNS panel (TXT, name
`_acme-challenge` / `_acme-challenge.www` / `_acme-challenge.api`, TTL 300). Before pressing Enter,
check from Windows that it is visible: `nslookup -type=TXT _acme-challenge.electriquevalley.com 8.8.8.8`.

Then add the certificate to nginx, with HTTP → HTTPS redirects:

```bash
sudo certbot install --nginx --cert-name electriquevalley.com --redirect
sudo nginx -t && sudo systemctl reload nginx
```

## 7. Full test in your browser, before anyone else sees it

As **administrator**, open `C:\Windows\System32\drivers\etc\hosts` in Notepad and add:

```
15.156.114.235 electriquevalley.com
15.156.114.235 www.electriquevalley.com
15.156.114.235 api.electriquevalley.com
```

Run `ipconfig /flushdns`, open a private window and check: the home page, every model page, FR/EN switch,
the **video showcase** (the CORS bug should be gone), the contact form and a newsletter sign-up
(the emails must arrive). Watch errors with `pm2 logs electriquevalley-api`.

**Remove the three lines from hosts afterwards** and run `ipconfig /flushdns` again.

## 8. Switch the DNS

In the DNS panel, change the **A records** for `@`, `www` and `api` to `15.156.114.235`.
Both servers work during propagation, so visitors notice nothing. Check progress:

```powershell
nslookup www.electriquevalley.com 8.8.8.8
```

When the new IP shows up, switch certificate renewal to the automatic method (no more TXT records):

```bash
sudo certbot certonly --nginx --cert-name electriquevalley.com \
  -d electriquevalley.com -d www.electriquevalley.com -d api.electriquevalley.com
# choose "Renew & replace the certificate"
sudo certbot renew --dry-run
```

## 9. After the switch

- **Newsletter catch-up (a day later):** people who signed up on the old host during propagation are only in
  the old database. In the old phpMyAdmin: table `newsletter_subscribers` → *Export* → *Custom* → *Data only*,
  tick *INSERT IGNORE*. Upload and import it the same way as in 2c.
- Once all is well for a week: set the DNS TTL back to 3600, and ask the old host to close the account.
- Delete the leftovers on the server: `~/electriquevalley.com`, `~/electriquevalley.nginx.old`, `~/upload/*`.

## Redeploying later

```powershell
# Windows
git archive --format=tar.gz -o "$env:TEMP\ev-server.tar.gz" HEAD server deploy
scp -i $KEY "$env:TEMP\ev-server.tar.gz" "${SRV}:~/upload/"
```
```bash
# Server (.env and videos are not in the archive, so they are kept)
cd ~/apps/electriquevalley && tar -xzf ~/upload/ev-server.tar.gz
cd server && npm ci && npm run build && pm2 restart electriquevalley-api
```

For the website, repeat step 4.
