// Page addresses in French and English. The table itself is in routes.json, so the
// pre-render script (scripts/prerender.mjs) can read the same list.
import routesFile from './routes.json';
import { Language } from '../translations/trans.login';

// "keyof typeof" = the list of page names in routes.json ('home', 'dmax', ...)
export type PageKey = keyof typeof routesFile.pages;

interface PageRoute { fr: string; en: string; legacy: string[]; live: boolean; }

export const ROUTES: Record<PageKey, PageRoute> = routesFile.pages;

/** Pages that are online (Elite is hidden for now: set "live" to true in routes.json to bring it back) */
export const LIVE_PAGES = (Object.keys(ROUTES) as PageKey[]).filter((page) => ROUTES[page].live);

export const SERIES_PAGES: PageKey[] = ['dmax', 'elite', 'luxor', 'classic', 'thor'];

/** Address of a page in a language, e.g. pathFor('dmax', 'en') -> '/en/dmax-series' */
export const pathFor = (page: PageKey, language: Language): string => ROUTES[page][language];

/** Removes a trailing slash ('/en/' -> '/en') so both forms match */
const clean = (pathname: string): string => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

/** Which page and language an address belongs to, or undefined for an unknown address */
export const findPage = (pathname: string): { page: PageKey; language: Language } | undefined => {
    const path = clean(pathname);
    for (const page of Object.keys(ROUTES) as PageKey[]) {
        if (ROUTES[page].fr === path) return { page, language: 'fr' };
        if (ROUTES[page].en === path) return { page, language: 'en' };
    }
    return undefined;
};

/** Language of any address: English under /en, French everywhere else */
export const languageOfPath = (pathname: string): Language =>
    findPage(pathname)?.language ?? (/^\/en(\/|$)/.test(pathname) ? 'en' : 'fr');
