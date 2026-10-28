// Modules
import { useRef, useEffect, useState, useContext } from "react";

// Components
import Button from "../../components/button/mainButton";

// Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Styles
import CardStyles  from "../../styles/cards.style";
import MainStyles from "../../styles/main.styles";

// Translations
import { translations } from '../../translations/trans.horizontalScroll';
import { LanguageContext } from '../../translations/languageSelection';

// Interfaces
import { i_modelCardProps } from '../../interfaces/interfaces';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll: React.FC<{ models: i_modelCardProps[]}> = ({ models  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const hSStyles = CardStyles();
    const mainStyles = MainStyles();
    const T = translations.horizontalScroll; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';
    const [isHovered, setIsHovered] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
         <div ref={containerRef} style={hSStyles.horizonContainer}>
            <div ref={sectionRef} style={hSStyles.horizonScrollSection}>
                {models.map((model, index) => (
                    <div 
                        key={index} 
                        style={{...hSStyles.horizonCard, margin: 'auto'}}
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div style={hSStyles.horizontalBgBlue}>
                            <h3 style={hSStyles.horizozntalTitle}>{model.title}</h3>
                            <img 
                                src={model.image} 
                                alt={model.title} 
                                style={{
                                    position: 'absolute', 
                                    top: window.innerWidth <= 768 ? "0" : '60px',
                                    right: window.innerWidth <= 768 ? '0' : '15px',
                                    width: window.innerWidth <= 768 ? "150px" : '250px',
                                    height: 'auto'
                                }} 
                            />
                        </div>
                        <hr style={hSStyles.horizozntalHr} />
                        <div>
                            <ul style={{ listStyle: 'none'}}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                    <div><span style={hSStyles.spanStyle}>{model.t1}</span></div>
                                    <div><h4 style={hSStyles.h4Title}>{model.p1}</h4></div>
                                </li>
                                <div style={{ width: window.innerWidth <= 768 ? '300px' : '280px', height: window.innerWidth <= 768 ? '140px' : '130px', marginTop: '20px', backgroundColor: '#f3f3f3'}}>
                                    <li style={{ borderBottom: 'solid 1px black', textAlign: 'center'}}>
                                        <span style={hSStyles.spanStyle}>{model.t2}</span>
                                        <h4 style={hSStyles.h4Title}>{model.p2}</h4>
                                    </li>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
                                        <li style={{ position: 'relative', width: '50%', textAlign: 'center'}}>
                                            <span style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: '20%',
                                                height: '60%',
                                                width: '1px',
                                                backgroundColor: 'black'
                                            }} />
                                            <span style={hSStyles.spanStyle}>{model.t3}</span>
                                            <h4 style={hSStyles.h4Title}>{model.p3}</h4>
                                        </li>
                                        <li style={{ width: '50%', textAlign: 'center'}}>
                                            <span style={hSStyles.spanStyle}>{model.t4}</span>
                                            <h4 style={hSStyles.h4Title}>{model.p4}</h4>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <Button 
                            customStyle={{ width: '90%'}} 
                            onClick={() => model.link && (window.location.href = model.link)} 
                            children={T.btn_learn_more[L]} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroll;
