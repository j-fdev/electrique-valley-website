// Modules
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Translations
import { pageMeta } from '../translations/trans.legal';
import { LanguageContext } from '../translations/languageSelection';

// Page addresses
import { findPage, pathFor, PageKey } from '../config/routes';

const SITE_URL = 'https://www.electriquevalley.com';

// Image shown when a page is shared (Facebook, Messenger, X...). JPG, because some apps don't show WebP.
// Not EVOLUTION.jpg: it shows the US manufacturer's brand name
const DEFAULT_SHARE_IMAGE = '/img/home/dmax_banner.jpg';
// "Partial<Record<...>>" = an object whose keys are page names, all optional
const SHARE_IMAGES: Partial<Record<PageKey, string>> = {
    dmax: '/img/home/dmax_banner.jpg',
    luxor: '/img/contact/Luxor-4-red-cart-scaled.jpg',
    classic: '/img/home/classic_series.jpg',
    thor: '/img/home/thor_series.jpg',
    contact: '/img/contact/Luxor-4-red-cart-scaled.jpg',
};

// Utility pages stay out of Google
const NOINDEX_PAGES: PageKey[] = ['unsubscribe'];

/** Creates the <meta> or <link> tag if it is missing, then sets its value. */
const setHeadTag = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
        tag = create();
        document.head.appendChild(tag);
    }
    tag.setAttribute(attr, value);
};

const linkTag = (rel: string, hreflang?: string) => () => {
    const l = document.createElement('link');
    l.setAttribute('rel', rel);
    if (hreflang) l.setAttribute('hreflang', hreflang);
    return l;
};

/**
 * Sets the tab title, the Google description, the social-sharing tags, the canonical URL,
 * the links to the other language (hreflang) and the page language (<html lang>) for the
 * current page. Called once, in App. The pre-render script saves the result in each page's HTML.
 */
export const useRouteMeta = () => {
    const { pathname } = useLocation();
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'fr';

    useEffect(() => {
        const page: PageKey = findPage(pathname)?.page ?? 'home';
        const meta = pageMeta[page];
        const title = meta.title[L];
        const description = meta.description[L];
        const url = SITE_URL + pathFor(page, L);

        document.title = title;
        document.documentElement.lang = L === 'fr' ? 'fr-CA' : 'en-CA';

        const metaByName = (name: string) => () => { const m = document.createElement('meta'); m.setAttribute('name', name); return m; };
        const metaByProperty = (prop: string) => () => { const m = document.createElement('meta'); m.setAttribute('property', prop); return m; };

        setHeadTag('meta[name="description"]', metaByName('description'), 'content', description);
        setHeadTag('meta[property="og:title"]', metaByProperty('og:title'), 'content', title);
        setHeadTag('meta[property="og:description"]', metaByProperty('og:description'), 'content', description);
        setHeadTag('meta[property="og:url"]', metaByProperty('og:url'), 'content', url);
        const image = SITE_URL + (SHARE_IMAGES[page] ?? DEFAULT_SHARE_IMAGE);
        setHeadTag('meta[property="og:image"]', metaByProperty('og:image'), 'content', image);
        setHeadTag('meta[name="twitter:title"]', metaByName('twitter:title'), 'content', title);
        setHeadTag('meta[name="twitter:description"]', metaByName('twitter:description'), 'content', description);
        setHeadTag('meta[name="twitter:image"]', metaByName('twitter:image'), 'content', image);
        setHeadTag('meta[property="og:locale"]', metaByProperty('og:locale'), 'content', L === 'fr' ? 'fr_CA' : 'en_CA');
        setHeadTag('meta[name="robots"]', metaByName('robots'), 'content', NOINDEX_PAGES.includes(page) ? 'noindex' : 'index, follow');

        // Each language version is its own page for Google, and points to the other one.
        // x-default = the page for visitors whose language is neither French nor English (French).
        setHeadTag('link[rel="canonical"]', linkTag('canonical'), 'href', url);
        setHeadTag('link[rel="alternate"][hreflang="fr-CA"]', linkTag('alternate', 'fr-CA'), 'href', SITE_URL + pathFor(page, 'fr'));
        setHeadTag('link[rel="alternate"][hreflang="en-CA"]', linkTag('alternate', 'en-CA'), 'href', SITE_URL + pathFor(page, 'en'));
        setHeadTag('link[rel="alternate"][hreflang="x-default"]', linkTag('alternate', 'x-default'), 'href', SITE_URL + pathFor(page, 'fr'));
    }, [pathname, L]);
};
