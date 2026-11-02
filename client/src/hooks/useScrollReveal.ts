// Modules
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Fades elements in as they scroll into view.
 * Add className="ev-reveal" (one element) or "ev-stagger" (its children one after another).
 * Variants: ev-reveal--left, ev-reveal--right, ev-reveal--zoom.
 * Replaces the old GSAP ScrollTrigger animations with a small IntersectionObserver.
 */
export const useScrollReveal = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const root = document.documentElement;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            root.classList.remove('ev-anim');
            return;
        }
        root.classList.add('ev-anim');

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        const observe = () => {
            document
                .querySelectorAll('.ev-reveal:not(.is-visible), .ev-stagger:not(.is-visible)')
                .forEach((el) => io.observe(el));
        };

        observe();
        // Content that appears later (videos from the API, a new model selected...) is picked up too.
        const mo = new MutationObserver(observe);
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            io.disconnect();
            mo.disconnect();
        };
    }, [pathname]);
};
