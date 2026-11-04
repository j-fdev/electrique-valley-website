// Modules
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Translations
import { pageMeta } from '../translations/trans.legal';
import { LanguageContext } from '../translations/languageSelection';

const SITE_URL = 'https://www.electriquevalley.com';

// Image shown when a page is shared (Facebook, Messenger, X...). JPG, because some apps don't show WebP.
const DEFAULT_SHARE_IMAGE = '/img/home/EVOLUTION.jpg';
const SHARE_IMAGES: Record<string, string> = {
    '/dmaxSeries': '/img/home/dmax_banner.jpg',
    '/luxorSeries': '/img/contact/Luxor-4-red-cart-scaled.jpg',
    '/classicSeries': '/img/home/classic_series.jpg',
    '/thorSeries': '/img/home/thor_series.jpg',
    '/contact': '/img/contact/Luxor-4-red-cart-scaled.jpg',
};

/** Creates the <meta> or <link> tag if it is missing, then sets its value. */
const setHeadTag = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
        tag = create();
        document.head.appendChild(tag);
    }
    tag.setAttribute(attr, value);
};

/**
 * Sets the tab title, the Google description, the social-sharing tags, the canonical URL and
 * the page language (<html lang>) for the current page. Called once, in App.
 */
export const useRouteMeta = () => {
    const { pathname } = useLocation();
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'fr';

    useEffect(() => {
        // "keyof typeof pageMeta" = one of the page paths listed in trans.legal.ts
        const meta = pageMeta[pathname as keyof typeof pageMeta] ?? pageMeta['/'];
        const title = meta.title[L];
        const description = meta.description[L];

        document.title = title;
        document.documentElement.lang = L === 'fr' ? 'fr-CA' : 'en-CA';

        const metaByName = (name: string) => () => { const m = document.createElement('meta'); m.setAttribute('name', name); return m; };
        const metaByProperty = (prop: string) => () => { const m = document.createElement('meta'); m.setAttribute('property', prop); return m; };

        setHeadTag('meta[name="description"]', metaByName('description'), 'content', description);
        setHeadTag('meta[property="og:title"]', metaByProperty('og:title'), 'content', title);
        setHeadTag('meta[property="og:description"]', metaByProperty('og:description'), 'content', description);
        setHeadTag('meta[property="og:url"]', metaByProperty('og:url'), 'content', SITE_URL + pathname);
        const image = SITE_URL + (SHARE_IMAGES[pathname] ?? DEFAULT_SHARE_IMAGE);
        setHeadTag('meta[property="og:image"]', metaByProperty('og:image'), 'content', image);
        setHeadTag('meta[name="twitter:title"]', metaByName('twitter:title'), 'content', title);
        setHeadTag('meta[name="twitter:description"]', metaByName('twitter:description'), 'content', description);
        setHeadTag('meta[name="twitter:image"]', metaByName('twitter:image'), 'content', image);
        setHeadTag('meta[property="og:locale"]', metaByProperty('og:locale'), 'content', L === 'fr' ? 'fr_CA' : 'en_CA');
        // Utility pages stay out of Google
        setHeadTag('meta[name="robots"]', metaByName('robots'), 'content', pathname === '/unsubscribe' ? 'noindex' : 'index, follow');
        setHeadTag('link[rel="canonical"]', () => { const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); return l; }, 'href', SITE_URL + (pathname === '/' ? '/' : pathname));
    }, [pathname, L]);
};
