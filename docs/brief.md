# Project brief

> Électrique Valley became a Tyrem Technologies client in November 2026. This brief records what is known; items marked **to confirm** need an answer from the client.

## Client

- **Business name:** Électrique Valley (incorporated; exact legal name and NEQ **to confirm**)
- **Contact:** the owner (J-F's brother-in-law); info@electriquevalley.com; 450 747-1525
- **Website:** www.electriquevalley.com (also electriquevalley.ca)
- **Languages:** French and English, French first

## The business

- Dealer of electric golf carts and utility vehicles in Salaberry-de-Valleyfield, Quebec.
- Series sold: D-MAX (Evolution Electric Vehicles; formerly called "Evolution" on the site), Elite, Luxor, Classic, Thor. Diablo is discontinued (removed November 2026).
- The manufacturer allows the use of its photos.

## Goals of the project

- Modernize the site (inspired by evolutionelectricvehicle.com, without copying it).
- Bring the site into line with Quebec rules: Law 25, French first, accessibility.
- Move hosting from the old cPanel host to AWS Lightsail with no downtime.
- More test-ride requests and dealer requests.

## Audience

- Buyers of golf and utility carts in Montérégie and the Montreal area; campgrounds, golf courses, municipalities.
- Businesses that want to become dealers.

## Content and features

- Pages: home, 5 series pages, video showcase, contact (test ride, find a dealer, become a dealer), privacy policy, terms of use.
- Features: contact and dealer form (email), newsletter sign-up (stored in MySQL), video capsules served by the API.
- **No online sales, orders or deposits:** everything is done in person or by phone.
- No analytics for now (planned, see `tasks.md`).
- Footer credit "Site conçu par Tyrem Technologies": approved by the client.

## Constraints

- Code base: React 18 + TypeScript (Create React App) and Express + TypeORM + MySQL. Migration to Vite planned later.
- Hosting: AWS Lightsail ca-central-1 (Montreal), held in the client's name.
