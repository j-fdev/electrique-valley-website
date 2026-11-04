// Modules
import { useState, useEffect } from 'react';

/** Width at and below which the navbar switches to the hamburger menu: the full links
 *  (logo + 4 links + contact + FR/EN, longer in French) need 1240 px; 1260 leaves a margin. */
export const NAV_BREAKPOINT = 1260;

/**
 * True when the window is `maxWidth` px wide or less (768 px by default: phones and small tablets).
 * Pass another width for a component that needs its own breakpoint, e.g. useWindowSize(NAV_BREAKPOINT).
 */
export const useWindowSize = (maxWidth = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [maxWidth]);

    return isMobile;
};
