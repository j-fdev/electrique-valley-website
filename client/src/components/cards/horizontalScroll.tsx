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

/** Series cards in a swipeable carousel with arrows and dots (no GSAP). */
const HorizontalScroll: React.FC<i_horizontal_scroll_props> = ({ models, eyebrow, title }) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const T = translations.horizontalScroll;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [active, setActive] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const update = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const cards = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft;
        let index = 0;
        cards.forEach((card, i) => {
            if (card.offsetLeft - track.offsetLeft <= left + 10) index = i;
        });
        setActive(index);
        setCanPrev(left > 5);
        setCanNext(left + track.clientWidth < track.scrollWidth - 5);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        update();
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            track.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [update]);

    const scrollToCard = (index: number) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.children[index] as HTMLElement | undefined;
        if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    };

    const step = (dir: 1 | -1) => scrollToCard(Math.max(0, Math.min(models.length - 1, active + dir)));

    return (
        <div className="ev-carousel">
            <div className="ev-carousel__head ev-reveal">
                <div>
                    {eyebrow && <span className="ev-eyebrow">{eyebrow}</span>}
                    {title && <h2 className="ev-section-title ev-section-title--left" style={{ margin: 0 }}>{title}</h2>}
                </div>
                <div className="ev-carousel__arrows">
                    <button className="ev-arrow" onClick={() => step(-1)} disabled={!canPrev} aria-label="Previous">
                        <svg viewBox="0 0 448 512" style={{ transform: 'rotate(180deg)' }}><path d={arrowPath} /></svg>
                    </button>
                    <button className="ev-arrow" onClick={() => step(1)} disabled={!canNext} aria-label="Next">
                        <svg viewBox="0 0 448 512"><path d={arrowPath} /></svg>
                    </button>
                </div>
            </div>

            <div ref={trackRef} className="ev-series-track ev-stagger">
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

            <div className="ev-dots">
                {models.map((m, i) => (
                    <button key={i} className={`ev-dot${i === active ? ' is-active' : ''}`} onClick={() => scrollToCard(i)} aria-label={m.title} />
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroll;
