// Modules
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Opens every new page at the top, instantly.
 * useLayoutEffect runs before the browser draws the new page, so the visitor never sees it
 * scroll up; 'instant' overrides any smooth-scrolling CSS.
 */
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
