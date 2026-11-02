// Modules
import { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

// Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Styles
import '../../styles/home.modern.css';

// Translations
import { translations } from '../../translations/trans.horizontalScroll';
import { LanguageContext } from '../../translations/languageSelection';

// Interfaces
import { i_modelCardProps } from '../../interfaces/interfaces';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll: React.FC<{ models: i_modelCardProps[]}> = ({ models  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const T = translations.horizontalScroll;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';
    const [, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        const isMobile = window.innerWidth <= 768;

        if (!container || !section) return;

        const totalWidth = section.scrollWidth;
        const containerWidth = container.offsetWidth;
        const needsScroll = totalWidth > containerWidth;

        let ctx = gsap.context(() => {
            // Apply scroll animation on mobile OR when desktop content overflows
            if (isMobile || (!isMobile && needsScroll)) {
                const scrollTrigger = ScrollTrigger.create({
                    trigger: container,
                    start: "top 10%",
                    end: () => `+=${totalWidth - containerWidth}`,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                    animation: gsap.to(section, {
                        x: () => `-${totalWidth - containerWidth}px`,
                        ease: "none",
                        duration: 1
                    }),
                    scrub: 0.05,
                    onUpdate: (self) => {
                        if (self.progress === 1 || self.progress === 0) {
                            document.body.style.overflow = 'auto';
                        }
                    },
                    onLeave: () => {
                        document.body.style.overflow = 'auto';
                        ScrollTrigger.refresh();
                    },
                    onEnterBack: () => {
                        ScrollTrigger.refresh();
                    }
                });

                return () => {
                    scrollTrigger.kill();
                    document.body.style.overflow = 'auto';
                };
            }
        });

        return () => {
            ctx.revert();
            document.body.style.overflow = 'auto';
        };
    }, [containerRef.current?.offsetWidth]); // Update when container width changes

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            <div ref={sectionRef} className="ev-series-track">
                {models.map((model, index) => (
                    <article key={index} className="ev-series-card" style={{ marginInline: 'auto' }}>
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
                                <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroll;
