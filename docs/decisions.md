# Decisions

> One entry per important choice (platform, library, architecture), so we remember why.

## 2026-11-02: Keep the existing code base

- **Context:** doubt whether an earlier chat had taken code from the live site in the browser instead of J-F's own code.
- **Decision:** keep this repository.
- **Why:** compared file by file with `D:\Alain Web sites\New React 2025\ElectriqueValley`: identical except the documented October fixes (spam traps, accent-aware names, newsletter API address, `/dashboard` and login code removed).
- **Consequences:** none; every later change is in its own git commit.

## 2026-11-02: Redesign without GSAP

- **Context:** modernize the site in the spirit of the manufacturer's site.
- **Decision:** CSS animations plus one small IntersectionObserver hook (`useScrollReveal`); the pinned horizontal scroll uses CSS `sticky` and one scroll listener. GSAP removed.
- **Why:** smaller bundle, respects `prefers-reduced-motion`, matches the studio house style.
- **Consequences:** `site.css` holds the new styles; the original model section and feature cards were kept on purpose (client preference).

## 2026-11-02: Evolution series renamed D-MAX, Diablo removed

- **Context:** the manufacturer now calls the series D-MAX (GT4, GT6, XT4, XT6); Diablo is discontinued.
- **Decision:** page moved to `/dmaxSeries`; Diablo page, route, images and translations deleted.
- **Why:** client request. No redirect from `/evolutionSeries` (client's choice).

## 2026-11-02: Own terms of use instead of the manufacturer's sale terms

- **Context:** the terms page was a copy of Evolution Electric Vehicles' sale terms (US clauses, the manufacturer named as "Company").
- **Decision:** replaced by Electrique Valley's terms of use, plus a Law 25 privacy policy, drafted from the studio templates.
- **Why:** the site sells nothing online; publishing another company's sale terms under Electrique Valley's name is misleading.
- **Consequences:** drafts to be approved by the client and reviewed by a lawyer. The old text stays in `trans.termsAndConditions.ts` and git history.

## 2026-11-02: Newsletter unsubscribe without accounts

- **Context:** CASL requires an unsubscribe mechanism in every commercial email; Law 25 policy promises deletion.
- **Decision:** signed links (HMAC of the email with `UNSUBSCRIBE_SECRET`) open `/unsubscribe`, where one button deletes the address. Without a link, the visitor types the address and receives a confirmation link.
- **Why:** no login needed; nobody can unsubscribe someone else; mail scanners that open links cannot unsubscribe by accident (a button click is required).
- **Consequences:** a new `.env` variable; the server refuses to create links if it is missing.

## 2026-11-03: Scroll to top with ScrollToTop, not ScrollRestoration

- **Context:** after scrolling down, changing pages showed the new page scrolling back up.
- **Decision:** `ScrollToTop` uses `useLayoutEffect` with an instant `window.scrollTo`, and the global `scroll-behavior: smooth` was removed.
- **Why:** React Router's `<ScrollRestoration />` only works with a data router (`createBrowserRouter`); this site uses `<BrowserRouter>` (react-router-dom 6), so it would have needed a router migration.
- **Consequences:** Back/Forward opens pages at the top instead of the previous position. Switch to `<ScrollRestoration />` if the router is ever migrated (for example with the Vite migration).
