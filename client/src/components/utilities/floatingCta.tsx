// Modules
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Translations
import { translations } from '../../translations/trans.navbar';
import { LanguageContext } from '../../translations/languageSelection';

/** Small "Book a test ride" button that appears in the bottom-right corner after scrolling. */
const FloatingCta: React.FC = () => {
    const [isShown, setIsShown] = useState(false);
    const { pathname } = useLocation();
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';
    const T = translations.navbar;

    useEffect(() => {
        const onScroll = () => setIsShown(window.scrollY > 500);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (pathname.startsWith('/contact')) return null;

    return (
        <Link to="/contact" className={`ev-float-cta${isShown ? ' is-shown' : ''}`} aria-hidden={!isShown} tabIndex={isShown ? 0 : -1}>
            <span className="ev-float-cta__dot" />
            {T.cta_test_ride[L]}
            <span aria-hidden="true">→</span>
        </Link>
    );
};

export default FloatingCta;
