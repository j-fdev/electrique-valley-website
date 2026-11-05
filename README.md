# Electrique Valley — Website

Bilingual (French / English) website for **Electrique Valley**, a Quebec dealer of electric golf carts and utility vehicles. Live at [electriquevalley.com](https://www.electriquevalley.com).

## Features

- Model pages for each series (D-MAX, Luxor, Classic, Thor) with colour pickers, feature cards and sliders
- French and English on their own URLs (French at `/`, English under `/en`), with hreflang and canonical tags
- Every page pre-rendered to static HTML at build time, so search engines and slow phones get content right away
- Scroll animations: a series carousel that scrolls sideways at every screen size, reveals and a cross-fading photo carousel, all turned off with "reduce motion"
- Contact form and "become a dealer" requests, sent by email
- Newsletter sign-up stored in MySQL, with signed unsubscribe links (Canada's anti-spam law)
- Privacy policy, terms of use and consent checkboxes written for Quebec's Law 25
- Video showcase streamed from the API
- Spam protection on the forms: per-IP rate limiting, a hidden honeypot field and server-side validation
- Optimized images: resized WebP, lazy loading and a preloaded hero image

## Tech stack

| Part | Technologies |
|---|---|
| Frontend (`client/`) | React 18, TypeScript, React Router, Create React App, Puppeteer (pre-rendering) |
| API (`server/`) | Node.js, Express, TypeScript, TypeORM, MySQL, Nodemailer |
| Hosting | AWS Lightsail (Ubuntu) with nginx (static files, reverse proxy, HTTPS) and pm2 |

**Development:** built by hand in React and Node. Claude Code (AI assistant) was used later in the project for refactoring, responsive testing and image optimization.

## Project structure

```
client/   React website (static build served by nginx)
server/   Express API: email, newsletter and video endpoints
deploy/   Server setup: nginx and pm2 configs, setup script, migration guide
docs/     Project brief, decisions, task list and launch checklist
```

### API endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/email/send-email` | Contact form |
| POST | `/api/email/subscribe` | Newsletter sign-up |
| POST | `/api/email/unsubscribe` | Newsletter unsubscribe |
| GET | `/api/videoCapsules` | List of showcase videos |
| GET | `/videos/:file` | Streams a video file |

## Running locally

Requirements: Node.js 20+ and a MySQL database.

```bash
# API
cd server
cp .env.example .env      # then fill in the values
npm install
npm run dev               # http://localhost:5000

# Website (second terminal)
cd client
npm install
npm start                 # http://localhost:3000
```

The website reads the API address from `REACT_APP_API_URL` (`client/.env.development` locally, `client/.env.production` for the live build).

## Deployment

```bash
cd client && npm run build           # static files in client/build, every page pre-rendered
cd server && npm run build && npm start   # compiled API in server/dist (run with pm2 in production)
```

Videos are not stored in git: they are uploaded to `server/src/uploads/convertedVideos` on the server.

The `deploy/` folder holds the nginx config, the pm2 config, a server setup script and the step-by-step migration guide: see [deploy/MIGRATION.md](deploy/MIGRATION.md).

## Author

Jean-François Drouin — [github.com/j-fdev](https://github.com/j-fdev)
