# Tasks

> Tick each task when it's done (`- [x]`). Keep tasks small: one feature or fix each.

## Setup

- [x] Move the project into `tyrem-studio/projects/002-electrique-valley` (git history kept)
- [x] Fill in `docs/brief.md`
- [ ] Delete the old copies once this folder is confirmed working: `C:\Applications_builds\ElectriqueValley\website`, `electrique_valley`, `electrique_valley_core` (ask J-F first)
- [ ] GitHub: delete the old repo (its history contains a password), create a new private one, push `main` and `redesign-home`

## To confirm with the client

- [ ] Exact legal name (for the terms of use, to say who runs the site). The NEQ is optional: Law 25 does not require it
- [ ] Contact email to publish: the contact page shows `electriquevalley@hotmail.com`, the footer and legal pages `info@electriquevalley.com`. Use one everywhere
- [ ] Street address to publish? (helps Google Maps and local search; today only the city is shown)
- [ ] Retention period for contact requests (draft says 12 months)
- [ ] Elite: is the blue Elite 4 offered? (replaced a duplicated black swatch). Elite is commented out for now (search "Elite hidden for now" to bring it back)
- [ ] Elite home card: top speed 40 km/h (copied from the other series)
- [ ] Approve the privacy policy and terms of use drafts; have a lawyer review them when possible

## Thor images

- [x] Remove the duplicate title on the Thor page
- [x] Green Thor with a ground shadow like the Luxor photos (`Thor-GREEN-shadow.png`, used site-wide)
- [ ] Green Thor hood logo: recolour it, or use the round brand logo from the footer (J-F, in Photopea)
- [x] White Thor cut out of `pikaso_edit-2.png`, grass cleaned off the wheels, ground shadow added (`Thor-WHITE-shadow.png`, Thor page)

## Legal (Law 25 and Quebec)

- [x] Privacy policy, person in charge published (owner, generic title)
- [x] Terms of use (replaced the manufacturer's sale terms that had been copied)
- [x] Unchecked consent box on the contact form, separate one for the newsletter
- [x] Footer links to the legal pages on every page
- [ ] Sign Tyrem's client contract (Law 25 service-provider clause) with Electrique Valley
- [x] Newsletter unsubscribe (CASL): signed link at the bottom of every newsletter email, `/unsubscribe` page, address deleted on confirmation
- [ ] CASL: newsletter emails must show a **mailing address** (today only the city). Get the address from the client and add it to `server/src/utilities/unsubscribe.ts` (`senderFooter`)
- [ ] Newsletters sent by hand (Gmail): paste the footer with the generic link `https://www.electriquevalley.com/unsubscribe` at the bottom of each one
- [ ] Production `.env`: set `UNSUBSCRIBE_SECRET` (64 random characters) on the AWS server
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

- [ ] Run the `launch-check` agent (SEO and legal) and fix its blockers; complete its off-site tasks in `docs/launch-checklist.md`
- [ ] AWS migration: see `deploy/MIGRATION.md`
- [ ] Test: phone, tablet, desktop; French and English; keyboard and contrast
- [ ] Merge `redesign-home` into `main` once approved

## After this project is deployed

- [ ] **Reminder for J-F:** recheck the **MG Lavage à pression** site (`C:\Applications_builds\MG Lavage a pression`) for the Quebec legal pages and SEO: run the `launch-check` agent on it
