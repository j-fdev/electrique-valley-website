# Launch checklist: Electrique Valley

- **Date:** 2026-11-04
- **Site:** Electrique Valley, branch `redesign-home` (not a git repository at the studio level, so no commit hash)
- **URL checked:** code only. The site is not online yet (target: https://www.electriquevalley.com on AWS Lightsail). Nothing was run: no install, no build, no server, no PageSpeed.
- **Scope:** `client/src`, `client/public`, `client/scripts/prerender.mjs`, `deploy/nginx/electriquevalley.conf`, `deploy/MIGRATION.md`, `server/src` (email and unsubscribe only). The `client/build` folder was not audited (it may be stale; re-check the build output after the final `npm run build`).
- Legal texts are drafts until the client approves them and a lawyer reviews them.

## Blockers (must fix before launch)

### B1. The manufacturer's name "Evolution" is in visible French and English text on the D-MAX page

Rule: the name must not appear in visible text, alt text, meta tags or the sharing image. The text lives in `client/src/translations/trans.evolutionSeries.ts`, which `client/src/pages/dmaxSeries.tsx:12` imports for `/serie-dmax` and `/en/dmax-series`. Each line below holds the word, in English or French (the French spells it "Évolution" in four lines, so a plain-ASCII search misses them).

| Lines | What it says (shortened) |
|---|---|
| 239 (EN), 240 (FR) | "...the Evolution on-demand 4-wheel drive system" / "...4x4 à la demande de l'Évolution" |
| 307 (EN), 308 (FR) | "EVOLUTION ICONIC LUXURY SEATS" / "SIÈGES DE LUXE EMBLÉMATIQUES DE L'ÉVOLUTION" |
| 473, 474 | Evolution microphone / Le microphone Evolution |
| 481, 482 | Evolution cup holders / Les porte-gobelets Evolution |
| 489 (EN), 490 (FR) | "Evolution's windshield" / "pare-brise de l'Évolution" |
| 497, 498 | Evolution glove box / La boîte à gants Evolution |
| 505, 506 | Evolution adjustable steering wheel / La colonne de direction réglable Evolution |
| 513, 514 | Evolution taillights / Les feux arrière Evolution |
| 521 (EN), 522 (FR) | "The panoramic mirror in Evolution" / "Le miroir panoramique de l'Évolution" |
| 529, 530 | Evolution enhances driving safety... / L'Évolution améliore la sécurité... |
| 537, 538 | Evolution enhances accessibility... / L'Évolution améliore l'accessibilité... |
| 553, 554 | Evolution is equipped with... / L'Évolution est équipée... |

**Fix:** replace with "D-MAX" (or "the cart" / "la voiturette") in all 12 places, in both languages. Then run `grep -rniE "evol(u|ū)tion|évolution" client/build` after the build and confirm no hit in the pre-rendered HTML outside file paths.

Also, the same file begins with two stray imports (`import { models } from "mongoose"` and `import { list } from "postcss"`, lines 1-2). Not a legal problem, but they pull server and build-tool code into the client file: remove them.

### B2. Check the D-MAX images by eye for the brand logo

I viewed `img/home/dmax_banner.jpg` (the default share image), `img/d-max/evolution_montage.png` and `img/d-max/Evolution_water_Bg.png`: none shows the name. Good. I did NOT open the 24 colour PNGs in `img/d-max/GT4`, `GT6`, `XT4`, `XT6` or `img/d-max/D_MaxFeatures`. Someone must scroll `/serie-dmax` and the model selector once and confirm no logo or "Evolution" lettering appears on a cart or feature picture. Mark this blocker as passed once done. File names containing "Evolution" are acceptable (they are visible only in the address of the image).

Share-image note: `dmax_banner.jpg` is 1920 x 1080 (16:9), not 1200 x 630. Facebook crops it, and the "D-MAX" lettering stays in the centre, so it should be readable. Optional improvement, see S8.

### B3. Privacy policy promises a 12-month deletion that no one is assigned to do

`client/src/translations/trans.legal.ts:~136` (section "Conservation") says contact-form requests are deleted after 12 months. The server does not store them: `server/src/controllers/email.controller.ts` only emails them (to `ADMIN_EMAIL`, sent through Gmail, read in Outlook.com). So the deletion depends on someone clearing the mailbox. There is also no job that removes old items.
**Fix (either one):** (a) add a written yearly task for the client ("delete form emails older than 12 months"), recorded in the service agreement, or (b) soften the sentence to "kept only as long as needed to answer you, then deleted". Law 25 treats a published promise as a commitment. This is a quick text fix, so it is listed as a blocker; if J-F prefers, it can be accepted in writing in `docs/decisions.md`.

## Should fix (not blocking, most valuable first)

### S1. Unknown addresses return HTTP 200 (soft 404), no 404 page

- `client/src/App.tsx:81-92` has no catch-all `<Route path="*">`, and `deploy/nginx/electriquevalley.conf` (the `location /` block, `try_files ... /app.html`) serves the empty app shell with a 200 status. A mistyped address shows the menu and an empty page, and Google may index junk addresses.
- **Fix:** add a `NotFound` page (French first, link to home and contact, `noindex` through `useRouteMeta`) and in nginx send unknown addresses to a `404.html` with `error_page 404 /404.html;` and `try_files $uri $uri/index.html =404;`. Pre-render `/404.html` too, in `prerender.mjs`.

### S2. Both `electriquevalley.com` and `www.` answer with content (duplicate hosts)

- `deploy/nginx/electriquevalley.conf:15` (`server_name electriquevalley.com www.electriquevalley.com`). The canonical tags point to www, but the bare domain is reachable without a redirect. Certbot will add HTTP to HTTPS redirects only, not non-www to www.
- **Fix:** a separate `server` block for `electriquevalley.com` that returns `301 https://www.electriquevalley.com$request_uri` (HTTP and HTTPS). Also note that the `FRONTEND_URL` CORS list in MIGRATION.md line 140 can stay as is.

### S3. Google Fonts load from Google's servers

- `client/public/index.html:66-68`. The policy discloses it (`trans.legal.ts`, "Témoins" section), so it is legal, but visitors' IP addresses go to Google, it adds a render-blocking request and it is a speed cost.
- **Fix:** self-host Inter and Outfit as WOFF2 in `client/public/fonts/`, preload the two used weights, remove the three Google lines, then delete the Google Fonts paragraph from the policy (and update "Last updated").

### S4. Speed: not measured, and some images are very large

- `img/home/blackScreenImage.png` is 3.5 MB; `color2.jpg` 0.8 MB, `color3.jpg` 1.1 MB, `home-banner-forester-4plus-c-2.jpg` 0.7 MB; many cart images are PNG. The target is PageSpeed mobile 90+.
- **Fix:** convert to WebP or AVIF at the displayed size; keep the hero image eager and everything else lazy. After deployment, run PageSpeed Insights on `/`, `/serie-dmax` and `/nous-joindre` (mobile) and write the real numbers in "Measured results" below. The nginx config has no `gzip` for `text/html` types beyond the default (nginx compresses HTML by default) and no `expires` on `/img/`; add `expires 30d` for images (they use `?v=` cache-busting).

### S5. No security headers in nginx

- `deploy/nginx/electriquevalley.conf`. Add `Strict-Transport-Security` (after HTTPS works on both hosts), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`. The Express API (`server/src/index.ts`) uses `cors` but no `helmet`; add it.

### S6. Staging or preview must be noindex

- Nothing in the repo makes a preview host noindex (`robots.txt` allows all, `useRouteMeta.ts:~75` sets `index, follow` on every page except unsubscribe). If a preview address is ever shared (for example the Lightsail IP `15.156.114.235` mentioned in MIGRATION.md around line 244), it can be indexed and compete with the real site. Serve a `Disallow: /` robots file and an `X-Robots-Tag: noindex` header on any host that is not `www.electriquevalley.com`, or keep the IP address private.

### S7. Small content and markup items

- `client/public/index.html:73` `<noscript>` message is English only; make it French first, bilingual.
- `client/src/components/ui/colorPicker.tsx:35` alt text is "Color Picker N" (English, not meaningful); use the colour name or `alt=""`.
- `client/src/components/form/login.form.tsx:78` alt "Logo" (the login page is not routed, `App.tsx:20`; ignore unless it is enabled).
- `client/src/components/navigation/navbar.tsx:224` `aria-label="Change language"` is English only on the French page; use "Changer de langue" / "Change language" by language.
- Home meta description FR (`trans.legal.ts`, `pageMeta.home`) mentions test rides "sur rendez-vous"; fine, just confirm the owner offers them (also in the terms).
- Sitemap `lastmod` is a hard-coded date (`client/public/sitemap.xml`); update it at each release.
- Elite is hidden consistently (route off, sitemap off, navbar commented out). Remember the many "Elite hidden for now" spots when it comes back. Two Elite questions are still open in `docs/tasks.md:18-19`.

### S8. Share image size (optional)

- Make a 1200 x 630 version of the D-MAX banner (`/img/home/dmax_banner-og.jpg`) so Facebook and Messenger do not crop it, and use it in `client/src/hooks/useRouteMeta.ts:16` and `client/public/index.html` (three places: og:image, twitter:image, JSON-LD image). Keep the manufacturer's name out of it.

### S9. Structured data

- `client/public/index.html:28-50` JSON-LD is valid in shape. It lists Facebook and Instagram links (`facebook.com/electriquevalley`, `instagram.com/electriquevalley`); nobody has confirmed these pages exist and belong to the business (also linked at `client/src/components/footer/footer.tsx:41,44`). Verify both links before launch or remove them. No street address, hours or `geo` by the owner's choice: when Google Business Profile is created as a service-area business, make the name, phone and city identical.

### S10. Tyrem designer credit

- `client/src/components/footer/footer.tsx:~97` links "Site conçu par Tyrem Technologies" to tyrem.ca. Studio rule: only with the client's agreement. Confirm it with the client (or remove it).

### S11. Forms and email, small points

- Contact form sends the subject `Contact Form Submission: ...` in English to the owner (`email.controller.ts:41`): fine for the owner, but check the confirmation email to the visitor is in the visitor's language (`emailTranslations.contact.subject[language]` is used, good).
- The honeypot field `website` (`contact.form.tsx:113`) is correct; keep `aria-hidden` and `tabIndex=-1`.

## Off-site tasks (owner: J-F or client)

These are open items, not code blockers.

| Task | Owner | When | Status |
|---|---|---|---|
| CASL: choose and publish a mailing address (street or PO box) for newsletter emails. The footer built by `server/src/utilities/unsubscribe.ts:39-44` has the city, phone and email, but CASL asks for a mailing address. Update `senderFooter` and the policy once the client decides. | Client (decision), J-F (code) | Before the first newsletter is sent. Not needed to launch if no newsletter is sent yet. A newsletter signup does send one confirmation email today, so decide before launch or turn the signup off. | Open |
| Confirm the source and rights of the photos (manufacturer pictures, `camping.jpg`, `camping-night-scaled.jpg`, `Luxor-4-red-cart-scaled.jpg`, and so on). The terms say photos are supplied by suppliers. | Client | Before launch | Open |
| Written permission or dealer agreement for using the manufacturer's pictures and model names (D-MAX, Luxor, Classic, Thor) in marketing. | Client | Before launch | Open |
| Lawyer review of the privacy policy and terms (`trans.legal.ts`) | Client (pays), J-F (sends) | After launch is acceptable, if the client agrees in writing | Open |
| Sign the service agreement (it must say how Tyrem protects personal information as a provider, Law 25) | J-F and client | Before launch (the privacy policy already mentions a written agreement) | Open |
| Google Business Profile: create or claim, exact name "Electrique Valley", category (golf cart dealer or similar), service area Salaberry-de-Valleyfield and region, phone 450 747-1525, website link, photos, French description. Verification can take days: start now. Match the NAP in the footer and JSON-LD. | Client (account), J-F (setup) | Start now | Open |
| Domain access (registrar and DNS for electriquevalley.com): needed for the DNS switch and certificates (MIGRATION.md steps 8-9) | Client | Before deployment | Open |
| Google Search Console: verify the domain, submit `https://www.electriquevalley.com/sitemap.xml`, check that French and English pages are both indexed | J-F | Day of launch; check again after 1-2 weeks | To do |
| Bing Webmaster Tools (import from Search Console) and Apple Business Connect | J-F | After Search Console | To do |
| Directories with the same NAP: Pages Jaunes, local chamber of commerce, the manufacturer's dealer locator | Client | After launch | To do |
| Facebook and Instagram profiles: link to the new site, same name, phone and city | Client | At launch | To do |
| Reviews: a simple way to ask real customers for Google reviews (a short link on invoices or in an email). Never write or buy reviews. | Client | After launch | To do |
| Email deliverability: SPF, DKIM, DMARC for the sending domain. The server sends through Gmail (`email.controller.ts:15`) from `EMAIL_USER`. If that is a gmail.com address, the form emails come from Gmail, not the domain: check where they land (spam folder) after deployment. | J-F | Before launch, test after | To do |
| Analytics: none for now (the client has not asked). If added later: GA4 with consent mode and a cookie banner, then update the policy. | Client decision | Later | Not planned |
| After launch: re-run PageSpeed on the live site; check Search Console coverage and the 301 redirects from the old addresses; confirm the certificate renewal (`sudo certbot renew --dry-run`, MIGRATION.md line 269) | J-F | Launch day and 1-2 weeks later | To do |

## Passed checks

**Browser storage and trackers (verified):** I searched `client/src` and `client/public` for `localStorage`, `sessionStorage`, `document.cookie`, `indexedDB`, `gtag`, `googletagmanager`, `google-analytics`, `fbq`, `facebook.net`, `hotjar` and `clarity`. The only hits were the policy's own sentences (`trans.legal.ts:92,100`), a template comment in `index.html:78` and an npm package name in `package-lock.json`. There is no `<script src>` in `index.html` (only the JSON-LD block), no iframe, no YouTube or Vimeo embed (the only YouTube URLs are in commented code in `luxorSeries.tsx:132-142`). The language is held in the address, not in the browser. No cookie banner is needed. The only third-party request from the browser is Google Fonts (see S3), and the policy discloses it.

**Law 25 and forms**
- Privacy policy is dated (4 November 2026), in French and English, names the person in charge (owner) with email, phone and city, and covers what is collected, why, who receives it (AWS Canada, Gmail, Outlook.com, outside Quebec disclosed), security, retention, rights and the Commission d'accès à l'information. See B3 for the one gap.
- Contact form: consent checkbox is unchecked by default and links to the policy (`contact.form.tsx:33,159-166`); fields are limited (name, phone, email, message, and business, town and province only for a dealer request).
- Newsletter: a separate unchecked checkbox (`newsletter.modal.tsx:44,132-136`); the server saves the address and date; the confirmation email carries sender name, city, phone, email and an unsubscribe link (`unsubscribe.ts:39-44`).
- Unsubscribe: signed link, one-click button, address deleted immediately; page at `/desabonnement` and `/en/unsubscribe`, set to `noindex` (`useRouteMeta.ts` NOINDEX_PAGES) and left out of the sitemap. Old `/unsubscribe` links keep their `?email&token` (nginx and `LegacyRedirect`).
- Terms of use present in both languages; the previous copy of the manufacturer's sale terms was removed (decision of 2026-11-02). No online sales, so Consumer Protection Act distance-contract rules do not apply; the terms say so.
- Footer links to the policy and terms on every page; email and phone are visible; French is the default at the root and English under `/en`.

**SEO**
- Unique title and description per page and language, set in `pageMeta` (`trans.legal.ts`): titles all under about 60 characters, descriptions about 100-155. Business type and city appear on the home page; the other pages carry the product series. Pre-rendered HTML contains them (the script fails the build if a page has no H1).
- `<html lang>` is `fr-CA` or `en-CA` by page (`useRouteMeta.ts`); hreflang `fr-CA`, `en-CA` and `x-default` (French) both ways in the head and in the sitemap; canonical on every page, self-referencing per language.
- `sitemap.xml` lists 9 pages x 2 languages = 18 URLs (Elite and unsubscribe excluded on purpose). `robots.txt` allows crawling and points to the sitemap.
- Open Graph and Twitter tags in `index.html` and updated per page; default share image `/img/home/dmax_banner.jpg` (JPG, absolute URL, no manufacturer name visible in it).
- Local business JSON-LD (`AutomotiveBusiness`) with name, phone, email, city only, matching the footer and policy (see S9 for the social links).
- Old addresses have 301 redirects in nginx (same list as `routes.json`), with the query kept; missing files return a real 404 (nginx file rule); `/static/` is cached one year; HTML is `no-cache`.
- Brand-name check: "Evolution" does not appear in `index.html`, the manifest, `useRouteMeta.ts` (only a code comment), `prerender.mjs`, the footer or the home page text (the home card title is "D-MAX"). Variable and file names that contain it are fine. Only `trans.evolutionSeries.ts` is affected (B1). `trans.eliteSeries.ts` uses "ELITE" and is not live. The design-inspiration link in `docs/sources.md` is an internal document, not site text.
- HTTPS plan: certbot with `--redirect` and a `renew --dry-run` check are in MIGRATION.md; nginx has HTTP only until certbot runs (expected).
- Accessibility basics seen in code: form labels and consent labels, `role="alert"` on consent errors, hero arrows and slider dots have `aria-label`, decorative images use `alt=""`, social icons have `aria-label`. Contrast and keyboard focus were not tested (needs the running site).

## Measured results

None yet. PageSpeed Insights and Lighthouse cannot be run before the site is online. Record them here after deployment, with the date:

| Page | Mobile score | Desktop score | LCP | Date |
|---|---|---|---|---|
| `/` | not measured | not measured | | |
| `/serie-dmax` | not measured | not measured | | |
| `/nous-joindre` | not measured | not measured | | |
