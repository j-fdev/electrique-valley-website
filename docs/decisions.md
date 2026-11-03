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
- **Decision:** replaced by Électrique Valley's terms of use, plus a Law 25 privacy policy, drafted from the studio templates.
- **Why:** the site sells nothing online; publishing another company's sale terms under Électrique Valley's name is misleading.
- **Consequences:** drafts to be approved by the client and reviewed by a lawyer. The old text stays in `trans.termsAndConditions.ts` and git history.
