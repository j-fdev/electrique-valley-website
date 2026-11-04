// Modules
import { CSSProperties } from 'react';

// Hooks
import { useWindowSize } from '../hooks/useWindowSize';

const CardStyles = () => {

const isMobile = useWindowSize();

// buttonCardStyles
const cardStyle: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', margin: '10px', cursor: 'pointer', position: 'relative' };
const defaultImageStyle: React.CSSProperties = { width: '100%', height: 'auto', borderRadius: '8px' };
const cardTitleStyle: CSSProperties = { 
    color: '#333', 
    fontSize: '1.2rem', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    padding: '10px 0', 
    margin: '0', 
    width: '100%', 
    background: '#f8f8f8', 
    borderRadius: '0 0 10px 10px' 
};

// horizontalScrollStyles

const horizonContainer: CSSProperties = {  position: 'relative' };
const horizonScrollSection: CSSProperties = { display: 'flex', gap: '20px', marginTop: isMobile ? "1rem" : '4rem' };
const horizonCard: CSSProperties = { 
    width: isMobile ? "320px" : "300px",
    height: isMobile ? "450px" : "520px",
    background: "#fff",
    color: "#333",
    fontSize: isMobile ? "20px" : "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "10px" : "0",
    // border: "1px solid rgba(0, 132, 176, 0.3)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    flexShrink: 0, // Prevents shrinking
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
};
const horizontalBgBlue: CSSProperties = { position: 'absolute', top: '0', width: isMobile ? '319px' : '299px', height: isMobile ? '100px' : '150px', backgroundColor: 'var(--clr-brand-blue-hover)' };
const horizozntalTitle: CSSProperties = { color: 'white', textAlign: isMobile ? 'left' : 'center', marginTop: isMobile ? '1.5rem' : '1rem', padding: isMobile ? '10px' : '0', fontSize: isMobile ? '1rem' : 'default', textShadow: '2px 2px 5px rgba(0, 132, 176, 0.5)' };
const horizonImage: CSSProperties = { position: 'absolute', top: isMobile ? "0" : '75px', right: isMobile ? '0' : 'auto', width: isMobile ? "150px" : '300px', height: 'auto' };
const horizozntalHr: CSSProperties = { position: 'relative', marginTop: isMobile ? '140px' : '200px', height: '0.2px', border: 'none', backgroundColor: 'rgba(55, 61, 69, 0.2', width: '90%' };
const h4Title: CSSProperties = { textAlign: 'center',  padding: '5px', fontWeight: 'bold', fontSize: '1rem'};
const spanStyle: CSSProperties = { fontSize: '12px', fontWeight: 'bold', padding: '5px', color: '#6a747c' };

// cartFeaturesStyles
const imageDivStyle: CSSProperties = { width: '100%', height: '0', paddingBottom: '50%', position: 'relative' };
const imageStyle: CSSProperties = { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' };

// chooseModelCardStyles
const chooseContainer: CSSProperties = { display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: isMobile ? 'wrap' : 'nowrap', alignItems: 'center'};
// maxWidth: never wider than the screen (350 px overflowed 320 px phones)
const chooseImageStyle: CSSProperties = { width: isMobile ? '350px' : '650px', maxWidth: '100%', height: 'auto' };
const chooseListStyle: CSSProperties = { textAlign: 'left', listStyleType: 'none' };
const chooseList: CSSProperties = { marginLeft: '5px', fontSize: isMobile ? '14px' : '16px' };
const chooseIcon: CSSProperties = { width: '10px', height: '10px', fill: 'var(--clr-dark-blue)', marginBlock: 'auto' };

// featuresCardsStyles
const featuresContainer: CSSProperties = { width: isMobile ? '80%' : '30%', textAlign: 'center', marginTop: '4rem' };

return {
    cardStyle, 
    defaultImageStyle, 
    cardTitleStyle,
    horizonContainer,
    horizonScrollSection,
    horizonCard,
    horizontalBgBlue,
    horizonImage,
    horizozntalTitle,
    horizozntalHr,
    h4Title,
    spanStyle,
    imageDivStyle,
    imageStyle,
    chooseContainer,
    chooseImageStyle,
    chooseListStyle,
    chooseList,
    chooseIcon,
    featuresContainer
};

};

export default CardStyles;
