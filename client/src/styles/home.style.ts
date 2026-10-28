// Modules
import { CSSProperties } from 'react';

// Hooks  
import { useWindowSize } from './../hooks/useWindowSize';

const HomeStyles = () => {
const isMobile = useWindowSize();
// Hero section styles
const heroWrapper: CSSProperties = { 
    position: 'relative', 
    height: window.innerWidth <= 1024 ? '250px' : '100vh', // Adjust height for mobile and tablets
    overflow: 'hidden' 
};
const homeHeroTitle: CSSProperties = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 1, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' };
const homeH3: CSSProperties = { fontSize: 'clamp(1.25rem, 1.0299rem + 0.9390vw, 1.875rem)', whiteSpace: 'nowrap' };

// Our Series section styles
const ourSeriesTitle: CSSProperties = { textAlign: 'center', fontSize: 'clamp(1.875rem, 1.4349rem + 1.8779vw, 3.125rem)', fontWeight: '800' };

// About section styles
const aboutWrapper: CSSProperties = { 
    display: 'flex', 
    gap: isMobile ? '2rem' : '5rem',
    flexWrap: isMobile ? 'wrap' : 'nowrap',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: isMobile ? '1rem' : '2rem',
    width: '100%',
    boxSizing: 'border-box'
}; 
const aboutBrandLogo: CSSProperties = { width: isMobile ? '250px' : '450px', height: 'auto' };
const aboutContent: CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }; 

// Paint colors section styles
const paintColorsContainer: CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: isMobile ? '1rem' : '2rem' };
const paintColorImage: CSSProperties = { width: '150px', height: '100px', objectFit: 'fill' };

// Features section styles
const bgImage: CSSProperties = { 
    position: 'relative',
    backgroundImage: 'url(/img/home/frontrackBlackandWhite.jpg)', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundAttachment: isMobile ? 'scroll' : 'fixed', 
    minHeight: isMobile ? 'auto' : '100vh', 
    width: '100%', 
    display: 'flex',  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isMobile ? 'black' : 'transparent',
    padding: isMobile ? '2rem 0' : '4rem 0'
};

const bgImageOverlay: CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 };
const bgImageContent: CSSProperties = { position: 'relative', zIndex: 2, color: 'white', display: 'block', textAlign: 'center', overflow: 'hidden' };
const featuresContainer: CSSProperties = { 
    minHeight: isMobile ? 'auto' : '100vh', 
    backgroundColor: isMobile ? 'black' : 'transparent', 
    paddingBottom: isMobile ? '4rem' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};
const featuresCardsDivs: CSSProperties = { display:  'flex', textAlign: 'center', flexDirection: isMobile ? 'column' : 'row', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: '10%', };
const featuresIcons: CSSProperties = { width: '75px', height: '75px', color: 'white', fill: 'var(--clr-brand-blue)' };  

// Video Showcase section styles
const videoShowcaseContainer: CSSProperties = { display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', padding: '2rem 0', color: 'white', backgroundColor: 'black'};
const videoShowcaseContent: CSSProperties = { padding: '20px', display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: '40px'};

// Lithium Battery section styles
const lithiumBatteryWrapper: CSSProperties = { display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'none' : 'center', alignItems: 'center', width: '100%', height: isMobile ? '500px' : '300px', backgroundColor: 'var(--clr-black)', color: 'white', gap: '1rem' };
const lithiumBatteryImage: CSSProperties = { width: '300px', height: 'auto', objectFit: 'fill' };
const lithiumBatteryContent: CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', color: 'white', marginRight: isMobile ? '0' : '200px' };


return {
    heroWrapper,
    homeHeroTitle,
    homeH3,
    ourSeriesTitle,
    aboutWrapper,
    aboutBrandLogo,
    aboutContent,
    paintColorsContainer,
    paintColorImage,
    bgImage,
    bgImageOverlay,
    bgImageContent,
    featuresContainer,
    featuresCardsDivs,
    featuresIcons,
    videoShowcaseContainer,
    videoShowcaseContent,
    lithiumBatteryWrapper,
    lithiumBatteryImage,
    lithiumBatteryContent
  };
};

export default HomeStyles;