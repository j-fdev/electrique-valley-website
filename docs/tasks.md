# Tasks

> Tick each task when it's done (`- [x]`). Keep tasks small: one feature or fix each.

## Setup

- [x] Move the project into `tyrem-studio/projects/002-electrique-valley` (git history kept)
- [x] Fill in `docs/brief.md`
- [ ] Delete the old copies once this folder is confirmed working: `C:\Applications_builds\ElectriqueValley\website`, `electrique_valley`, `electrique_valley_core` (ask J-F first)
- [ ] GitHub: delete the old repo (its history contains a password), create a new private one, push `main` and `redesign-home`

## To confirm with the client

- [ ] Exact legal name and NEQ (for the terms of use)
- [ ] Contact email to publish: the contact page shows `electriquevalley@hotmail.com`, the footer and legal pages `info@electriquevalley.com`. Use one everywhere
- [ ] Street address to publish? (helps Google Maps and local search; today only the city is shown)
- [ ] Retention period for contact requests (draft says 12 months)
- [ ] Elite: is the blue Elite 4 offered? (replaced a duplicated black swatch)
- [ ] Elite home card: top speed 40 km/h (copied from the other series)
- [ ] Approve the privacy policy and terms of use drafts; have a lawyer review them when possible

## Legal (Law 25 and Quebec)

- [x] Privacy policy, person in charge published (owner, generic title)
- [x] Terms of use (replaced the manufacturer's sale terms that had been copied)
- [x] Unchecked consent box on the contact form, separate one for the newsletter
- [x] Footer links to the legal pages on every page
- [ ] Sign Tyrem's client contract (Law 25 service-provider clause) with Électrique Valley
- [ ] Newsletter emails (Canada's anti-spam law, CASL): each email must identify the sender and include a working unsubscribe link. Add an unsubscribe endpoint (the `active` column already exists)
- [ ] Delete contact emails older than the retention period (manual routine in the mailbox for now)

## SEO and speed

- [x] Title and description per page, `<html lang>` follows the language, canonical URL
- [x] Social-sharing tags, business details for Google (JSON-LD), `sitemap.xml`, `robots.txt`
- [x] Home page H1 (text was only inside the banner images); descriptive alt text on banners and feature photos
- [x] French as the default language when the browser is neither French nor English
- [ ] Google Business Profile: create or claim it (biggest gain for local search)
- [ ] Submit `sitemap.xml` in Google Search Console after launch
- [ ] Separate French and English URLs (e.g. `/fr/serie-dmax`, `/en/dmax-series`) so Google indexes both languages
- [ ] Convert large JPG/PNG to WebP and resize them; check PageSpeed (target 90+)
- [ ] Self-host the fonts instead of Google Fonts (faster, no data sent to Google); needs `@fontsource` packages, ask J-F first
- [ ] Add a branded image for social sharing (1200 × 630)
- [ ] Clean up the ESLint warnings (unused imports)

## Later

- [ ] Google Analytics, only with a consent banner (off until accepted) and an update of the privacy policy
- [ ] Migrate from Create React App to Vite (studio default)

## Launch

- [ ] AWS migration: see `deploy/MIGRATION.md`
- [ ] Test: phone, tablet, desktop; French and English; keyboard and contrast
- [ ] Merge `redesign-home` into `main` once approved
