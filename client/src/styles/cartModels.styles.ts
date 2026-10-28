// Modules
import { CSSProperties } from 'react';
// Hooks  
import { useWindowSize } from '../hooks/useWindowSize';

const CartModelsStyles = () => {
    const isMobile = useWindowSize();

    // const pageContainer: CSSProperties = { fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6' };
    const header: CSSProperties = { position: 'relative', width: '100%', height: isMobile ? '300px' : '600px', overflow: 'hidden' };
    const headerBgImage: CSSProperties = { width: '100%', objectPosition: 'center bottom' };
    const headerOverlay: CSSProperties = { position: 'absolute', bottom: '0', width: '100%', minHeight: '600px', background: 'linear-gradient(180deg, #FFFFFF00 70%, #FFFFFF 70%)', zIndex: 1 };
    const headerCartImage: CSSProperties = { position: 'absolute', top: isMobile ? '20%' :  '10%', transform: 'translateX(-50%)', left: '50%', width: isMobile ? '400px' : '900px', height: 'auto', zIndex: 2 };
    const headerTitle: CSSProperties = { textAlign: 'center', fontSize: 'clamp(1.875rem, 1.4349rem + 1.8779vw, 3.125rem)', fontWeight: '800' };

    // Choose your model section
    const buttonCardContainer: CSSProperties = { display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center'  };
    const chooseModelImage: CSSProperties = { width: '150px', height: 'auto' };
    const touchScreenIcons: CSSProperties = { width: '50px', height: '50px' };   

    // Discover Luxor section
    const imageContainer: CSSProperties = { flex: '1', padding: '20px' };
    const bgLuxorTextImage: CSSProperties = { width: 'auto', height: isMobile ? '40px' : '200px', marginTop: isMobile ? '10px' : '20px' };
    const image: CSSProperties = { width: isMobile ? '300px' : '400px', height: 'auto', position: 'relative', zIndex: 1 };
    const discoverContent: CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: isMobile ? '1rem' : '1.5rem' }; 
    const discoverHr: CSSProperties = { border: 'none', borderTop: '4px solid var(--clr-brand-blue)', width: isMobile ? '40%' : '20%', height: '20px' };
    const discoverWrapper: CSSProperties = { display: 'flex', gap: isMobile ? '2rem' : '5rem', flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'center', alignItems: 'center', padding: isMobile ? '2rem 2rem' : '4rem 2rem', width: '100%', position: 'relative' }; 
    const subTitle: CSSProperties = { fontSize: isMobile ? '26px' : '42px', lineHeight: '1.2', fontWeight: '800'};
    
    // Features Luxor section
    const featuresGrid: CSSProperties = { display: 'grid', gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '40px', margin: '0 auto', padding: isMobile ? '0' : '10px' };

    // Specification section
    const specContainer: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '15px 40px',  backgroundColor: 'white', marginBottom: '2px'};
    const specHr: CSSProperties = { border: 'none', borderTop: '1px solid var(--clr-brand-blue)', width: isMobile ? '40%' : '10%', marginInline: 'auto', marginBottom: '2rem'  };
    const specHeader: CSSProperties = { display: 'flex',  fontSize: '18px', fontWeight: "bold", cursor: 'pointer' };
    const specIcons: CSSProperties = { width: '15px', height: '15px' };
    const specContent: CSSProperties = { padding: '2px 60px', backgroundColor: '#f9f9f9', fontFamily: 'Merriweather , sans-serif', fontSize: '14px', fontWeight: '300', transition: 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out', overflow: 'hidden', maxHeight: '0', opacity: '0' };            
    
    return {
        header,
        headerBgImage,
        headerOverlay,
        headerTitle,
        buttonCardContainer,
        chooseModelImage,
        touchScreenIcons,
        imageContainer,
        bgLuxorTextImage,
        image,
        headerCartImage,
        discoverContent,
        discoverHr,
        discoverWrapper,
        subTitle,
        featuresGrid,
        specContainer,
        specHr,
        specHeader,
        specIcons,
        specContent,
    };
};

export default CartModelsStyles;
