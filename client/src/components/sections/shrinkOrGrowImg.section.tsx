// Modules
import { useState, useEffect, useContext } from "react";
import { gsap } from "gsap";

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Interface
import {  i_shrinkGrow_props } from '../../interfaces/interfaces';

// Translations
import { translations } from '../../translations/trans.luxorSeries';
import { LanguageContext } from '../../translations/languageSelection';



const ShrinkOrGrowImgSection: React.FC<{ shrinkGrowItems: i_shrinkGrow_props[] }> = ({ shrinkGrowItems }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    const isMobile = useWindowSize();

    const imgWidth = viewportWidth / shrinkGrowItems.length;
    const imgSmallWidth = (viewportWidth - (imgWidth * 2)) / (shrinkGrowItems.length - 1);
    const imgLargeWidth = imgWidth * 2;

    const viewHeight = 400;
    const imgHeight = viewHeight / shrinkGrowItems.length;
    const imgSmallHeight = (viewHeight - (imgHeight * 2)) / (shrinkGrowItems.length - 1);
    const imgLargeHeight = imgHeight * 2;

    const T = translations.luxorSeries;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (hoveredIndex !== null) {
            gsap.fromTo(
                `#text-${hoveredIndex} h2`,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
            );
            gsap.fromTo(
                `#text-${hoveredIndex} p`,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
            );
        }
    }, [hoveredIndex]);

    return (
        <div style={{ position: 'relative', display: "flex", flexWrap: isMobile ? 'wrap' : 'nowrap', flexDirection: isMobile ? 'column' : 'row', width: '100%', maxHeight: isMobile ? 'auto' : '400px', borderRadius: isMobile ? '4px' : '10px', overflow: 'hidden' }}>
            {shrinkGrowItems.map((item, index) => (
                <div
                    key={index}
                    style={{
                        width: isMobile ? "" : hoveredIndex === null ? imgWidth : hoveredIndex === index ? imgLargeWidth : imgSmallWidth,
                        height: isMobile ? hoveredIndex === null ? imgHeight : hoveredIndex === index ? imgLargeHeight : imgSmallHeight : "400px",
                        transition: "all 0.3s ease-in-out",
                        maxHeight: isMobile ? imgLargeHeight : '400px',
                        position: 'relative',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <img src={item.image} alt={`img-${index}`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                           {/* Add dark overlay */}
                <div 
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                    }} 
                />
                    <div id={`text-${index}`} style={{ position: 'absolute', display: hoveredIndex === index ? 'block' : 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', zIndex: 2, textAlign: 'center' }}>
                        <h2 style={{ color: 'white', fontSize: '1.625rem'}}>{item.title}</h2>
                        <p>{item.paragraph}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default ShrinkOrGrowImgSection;