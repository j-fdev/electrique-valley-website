// Modules
import { useRef, useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";

// Translations
import { translations } from '../../translations/trans.horizontalScroll';
import { LanguageContext } from '../../translations/languageSelection';

// Interfaces
import { i_modelCardProps } from '../../interfaces/interfaces';

interface i_horizontal_scroll_props {
    models: i_modelCardProps[];
    eyebrow?: string;
    title?: string;
}

const arrowPath = "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z";
const NAVBAR_HEIGHT = 72;
// Breathing room kept above and below the pinned block
const SCREEN_MARGIN = 16;

/**
 * Series cards that slide sideways while the page scrolls down (the block stays pinned until the
 * last card is visible). Works at every screen size:
 * - the pinned block is exactly as tall as its content and centred under the navbar (no empty bands);
 * - when the title and cards are taller than the screen (phone held sideways, short laptop), the
 *   block is scaled down to fit, so it never slides over the next section.
 * With "reduce motion" turned on, the cards are a normal row you swipe.
 * Pure CSS sticky + one scroll listener, no GSAP.
 */
const PIN_QUERY = '(prefers-reduced-motion: no-preference)';

const HorizontalScroll: React.FC<i_horizontal_scroll_props> = ({ models, eyebrow, title }) => {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const headRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useState(0); // sideways travel, in unscaled pixels
    const [natural, setNatural] = useState(0);   // content height before scaling
    const [scale, setScale] = useState(1);
    const [canPin, setCanPin] = useState(() => window.matchMedia(PIN_QUERY).matches);
    useEffect(() => {
        const media = window.matchMedia(PIN_QUERY);
        const onChange = () => setCanPin(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);
    const pinned = canPin && distance > 0 && natural > 0;
    const pinHeight = natural * scale;
    const T = translations.horizontalScroll;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    // Sideways distance, content height and the scale that makes the content fit the screen.
    // offsetHeight/scrollWidth ignore CSS transforms, so these are always unscaled sizes.
    const measure = useCallback(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        const head = headRef.current;
        if (!track || !viewport || !head) return;
        setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
        const contentHeight = head.offsetHeight + viewport.offsetHeight;
        setNatural(contentHeight);
        const available = window.innerHeight - NAVBAR_HEIGHT - SCREEN_MARGIN * 2;
        const next = Math.min(1, available / contentHeight);
        // Small threshold: scaling changes card widths, which can change heights by a pixel or two
        setScale((prev) => (Math.abs(prev - next) > 0.01 ? next : prev));
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        // Card images loading and scale changes resize the track: measure again
        const observer = new ResizeObserver(measure);
        if (trackRef.current) observer.observe(trackRef.current);
        if (headRef.current) observer.observe(headRef.current);
        return () => {
            window.removeEventListener('resize', measure);
            observer.disconnect();
        };
    }, [measure, models.length]);

    // Move the cards according to the vertical scroll position
    useEffect(() => {
        if (!pinned) {
            if (trackRef.current) trackRef.current.style.transform = '';
            return;
        }
        let frame = 0;
        const update = () => {
            frame = 0;
            const outer = outerRef.current;
            const pin = pinRef.current;
            const track = trackRef.current;
            if (!outer || !pin || !track) return;
            const stickyTop = parseFloat(pin.style.top) || NAVBAR_HEIGHT;
            const scrollable = outer.offsetHeight - pin.offsetHeight;
            const progress = scrollable > 0 ? Math.min(1, Math.max(0, (stickyTop - outer.getBoundingClientRect().top) / scrollable)) : 0;
            track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [distance, pinned, pinHeight]);

    // Centre the pinned block in the space under the navbar
    const stickyTop = NAVBAR_HEIGHT + Math.max(SCREEN_MARGIN, (window.innerHeight - NAVBAR_HEIGHT - pinHeight) / 2);
    const scaled = pinned && scale < 1;

    return (
        // The outer block is taller than the cards by the sideways distance, so scrolling it drives them.
        <div ref={outerRef} className="ev-carousel" style={{ height: pinned ? `${pinHeight + distance * scale}px` : undefined }}>
            <div
                ref={pinRef}
                className={pinned ? 'ev-carousel__pin' : undefined}
                style={pinned ? { top: `${stickyTop}px`, height: `${pinHeight}px`, overflowY: scaled ? 'clip' : undefined } : undefined}
            >
                {/* When scaled, the content is laid out wider (100% / scale) then shrunk back to full width */}
                <div style={scaled ? { width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: 'top left' } : undefined}>
                    <div ref={headRef} className="ev-carousel__head ev-reveal">
                        <div>
                            {eyebrow && <span className="ev-eyebrow">{eyebrow}</span>}
                            {title && <h2 className="ev-section-title ev-section-title--left" style={{ margin: 0 }}>{title}</h2>}
                        </div>
                    </div>

                    <div ref={viewportRef} className="ev-carousel__viewport">
                        <div ref={trackRef} className={`ev-series-track${pinned ? ' ev-series-track--pinned' : ''} ev-stagger`}>
                            {models.map((model, index) => (
                                <article key={index} className="ev-series-card">
                                    <div className="ev-series-card__media">
                                        <h3 className="ev-series-card__title">{model.title}</h3>
                                        <img className="ev-series-card__img" src={model.image} alt={model.title} loading="lazy" />
                                    </div>

                                    <div className="ev-series-card__body">
                                        <div className="ev-spec-hero">
                                            <span className="ev-spec__label">{model.t1}</span>
                                            <span className="ev-spec__value">{model.p1}</span>
                                        </div>
                                        <div className="ev-spec-grid">
                                            <div className="ev-spec ev-spec--wide">
                                                <span className="ev-spec__label">{model.t2}</span>
                                                <span className="ev-spec__value">{model.p2}</span>
                                            </div>
                                            <div className="ev-spec">
                                                <span className="ev-spec__label">{model.t3}</span>
                                                <span className="ev-spec__value">{model.p3}</span>
                                            </div>
                                            <div className="ev-spec">
                                                <span className="ev-spec__label">{model.t4}</span>
                                                <span className="ev-spec__value">{model.p4}</span>
                                            </div>
                                        </div>
                                        <Link to={model.link || '/'} className="ev-series-card__cta">
                                            {T.btn_learn_more[L]}
                                            <svg viewBox="0 0 448 512" aria-hidden="true"><path d={arrowPath} /></svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalScroll;
