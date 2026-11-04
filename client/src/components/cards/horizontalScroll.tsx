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

/**
 * Series cards that slide sideways while the page scrolls down (the section stays pinned
 * until the last card is visible). Pure CSS sticky + one scroll listener, no GSAP.
 */
const PIN_QUERY = '(min-width: 1025px) and (prefers-reduced-motion: no-preference)';

const HorizontalScroll: React.FC<i_horizontal_scroll_props> = ({ models, eyebrow, title }) => {
    const outerRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [distance, setDistance] = useState(0);
    // Short screens (a phone or tablet held sideways) cannot show the whole pinned block, so the
    // cards would slide over the next section: pin only when the title and cards fit on screen.
    const [fits, setFits] = useState(true);
    const headRef = useRef<HTMLDivElement | null>(null);
    // Pinned sideways scrolling only on wide screens (and with motion allowed). On tablets and
    // phones the pinned block is a full screen tall, which left big empty bands around the cards:
    // there the cards are a normal row you swipe.
    const [canPin, setCanPin] = useState(() => window.matchMedia(PIN_QUERY).matches);
    useEffect(() => {
        const media = window.matchMedia(PIN_QUERY);
        const onChange = () => setCanPin(media.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);
    const pinned = canPin && fits && distance > 0;
    const T = translations.horizontalScroll;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    // How far the cards must travel sideways
    const measure = useCallback(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;
        setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
        const headHeight = headRef.current?.offsetHeight ?? 0;
        setFits(headHeight + track.offsetHeight + 24 <= window.innerHeight - NAVBAR_HEIGHT);
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        const imgs = trackRef.current?.querySelectorAll('img') ?? [];
        imgs.forEach((img) => img.addEventListener('load', measure));
        return () => {
            window.removeEventListener('resize', measure);
            imgs.forEach((img) => img.removeEventListener('load', measure));
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
            const track = trackRef.current;
            if (!outer || !track) return;
            const scrollable = outer.offsetHeight - (window.innerHeight - NAVBAR_HEIGHT);
            const progress = scrollable > 0 ? Math.min(1, Math.max(0, (NAVBAR_HEIGHT - outer.getBoundingClientRect().top) / scrollable)) : 0;
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
    }, [distance, pinned]);

    return (
        // The outer block is as tall as the sideways distance, so scrolling it drives the cards.
        <div ref={outerRef} className="ev-carousel" style={{ height: pinned ? `calc(100vh - ${NAVBAR_HEIGHT}px + ${distance}px)` : undefined }}>
            <div className={pinned ? 'ev-carousel__pin' : undefined}>
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
                                    <img className="ev-series-card__img" src={model.image} alt={model.title} />
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
    );
};

export default HorizontalScroll;
