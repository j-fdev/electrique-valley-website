# Électrique Valley — Website

Bilingual (French / English) website for **Électrique Valley**, a Quebec dealer of electric golf carts and utility vehicles. Live at [electriquevalley.com](https://www.electriquevalley.com).

## Features

- Model pages for each series (Evolution, Elite, Luxor, Classic, Diablo, Thor) with colour pickers, feature cards and sliders
- Language switch (FR / EN) across the whole site
- Contact form and "become / find a dealer" requests, sent by email
- Newsletter sign-up stored in MySQL, with a confirmation email
- Video showcase streamed from the API
- Spam protection on the forms: per-IP rate limiting and a hidden honeypot field, plus server-side validation

## Tech stack

| Part | Technologies |
|---|---|
| Frontend (`client/`) | React 18, TypeScript, React Router, Create React App |
| API (`server/`) | Node.js, Express, TypeScript, TypeORM, MySQL, Nodemailer |
| Hosting | Ubuntu server with nginx (reverse proxy + HTTPS) and pm2 |

## Project structure

```
client/   React website (static build served by nginx)
server/   Express API: email, newsletter and video endpoints
```

### API endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/email/send-email` | Contact form |
| POST | `/api/email/subscribe` | Newsletter sign-up |
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
cd client && npm run build           # static files in client/build
cd server && npm run build && npm start   # compiled API in server/dist (run with pm2 in production)
```

Videos are not stored in git: they are uploaded to `server/src/uploads/convertedVideos` on the server.

## Author

Jean-François Drouin — [github.com/j-fdev](https://github.com/j-fdev)
