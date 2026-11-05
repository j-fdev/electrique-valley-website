// Modules
import { CSSProperties } from 'react';

// Hooks
import { useWindowSize } from './../hooks/useWindowSize';

const MainStyles = () => {
    const isMobile = useWindowSize();
    const container: CSSProperties = { width: '90%', maxWidth: '1600px', margin: '0 auto', padding: '0 15px' };
    const section: CSSProperties = { margin: isMobile ? '30px 0' : '100px 0' };
    const sectionImageLeft: CSSProperties = { display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', marginBottom: '2rem' };
    const sectionStacked: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' };

    const mainBtn = (isHovered: boolean): CSSProperties => ({
        fontFamily: 'var(--ev-font-head)',
        fontSize: 'clamp(0.85rem, 0.78rem + 0.3vw, 1rem)',
        fontWeight: 600,
        letterSpacing: '0.02em',
        marginTop: isMobile ? '1rem' : '1.5rem',
        padding: '13px 28px',
        backgroundColor: isHovered ? 'var(--ev-blue-dark)' : 'var(--ev-blue)',
        boxShadow: isHovered ? '0 16px 30px rgba(8, 68, 125, 0.3)' : '0 10px 24px rgba(0, 132, 176, 0.28)',
        color: 'white',
        borderRadius: '999px',
        border: 'none',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease'
    });

    const blackBtn: CSSProperties = ({ backgroundColor: 'black' });

    const messageStyle: CSSProperties = { position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', backgroundColor: 'aliceblue', color: 'red', border: '2px solid red', borderRadius: '5px', textAlign: 'center', zIndex: 1000 };
    const title: CSSProperties = { marginTop: isMobile ? '1rem' : '2rem', textAlign: 'center', };
    const subtitle: CSSProperties = { fontSize: isMobile ? '1.2rem' : '1.5rem', marginTop: isMobile ? '0.5rem' : '1rem', };

    const paragraph: CSSProperties = { marginTop: isMobile ? '1rem' : '1.5rem', maxWidth: '65ch' };
    const hrStyle: CSSProperties = { height: '1px', width: '40%', borderColor: 'var(--clr-brand-blue)' };
    const specHrLight: CSSProperties = { borderTop: '0.5px solid rgba(236, 236, 236, 0.54)'  };

    const flex = { display: 'flex' };
    const justifyCenter = { justifyContent: 'center' };
    const alignCenter = { alignItems: 'center' };
    const column = { flexDirection: 'column' };
    const row = { flexDirection: 'row' };
    const textAlignCenter: CSSProperties = { textAlign: 'center' };
    const imageStyle: CSSProperties = { width: isMobile ? '250px' : '500px', marginRight: isMobile ? '0' : '2rem', marginBottom: isMobile ? '1rem' : '0' };
    const warrantySliderImage: CSSProperties = { width: '100%', height: '500px', objectFit: 'cover', display: 'block', opacity: 0, transition: 'opacity 1s ease-in-out' };
    const warrantySliderImgActive: CSSProperties = { opacity: 1 };

    const confirmAlert: CSSProperties = { position : 'fixed', height : '80px', width : '100%', textAlign : 'center', fontSize : '24px', fontWeight : 'bold', color : 'white', zIndex : '9999' }

    // carplay section
    const carplayImageDiv: CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4rem auto' };
    const carplayImage: CSSProperties = { width: isMobile ? '320px' : '800px', height: 'auto' };
    const carplayLogo: CSSProperties = { width: '100px', height: 'auto', marginTop: isMobile ? '1rem' : '4rem' };
    
    // Test Ride section
    const testRideContainer: CSSProperties = { display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20px' : '80px' };
    const testRideContent: CSSProperties = { 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        textAlign: isMobile ? 'center' : 'left', 
        width: '100%', 
        minWidth: isMobile ? '280px' : '300px', // Ensure minimum width
        maxWidth: isMobile ? '500px' : '800px', // Prevent content from getting too wide
        padding: isMobile ? '0 20px' : '0 40px', // Reduced desktop padding for better tablet experience
        margin: '0 auto' 
    };
    const testRideImageCamping: CSSProperties = { position: 'absolute', right: isMobile ? '50%' : '0', transform: isMobile ? 'translateX(50%)' : 'translateX(0)', width: isMobile ? '300px' : '600px', height: 'auto' };
    const testRideImageLuxor: CSSProperties = { position: 'relative', top: '0', right: isMobile ? '20%' : '250px', transform: isMobile ? 'translateX(50%)' : 'translateX(0)', width: isMobile ? '250px' : '500px', height: 'auto'};
    
    // Register up Dealer
    const registerDealerIcon: CSSProperties = { width: isMobile ? '80px' : '120px', height: 'auto', color: 'white', fill: 'var(--clr-med-blue)' };
    const registerUpButton: CSSProperties = { marginTop: isMobile ? '1rem' : '1.5rem', backgroundColor: 'black', transition: 'transform 0.3s ease-in-out' };
   
    // Subscribe Newsletter section
    const subscribeUpBgImg: CSSProperties = { backgroundImage: 'url(/img/home/camping-night-scaled.webp)', backgroundSize: 'cover', backgroundPosition: 'center', height: isMobile ? '500px' : '100vh', width: '100%', display: 'flex', justifyContent: 'center' };
    const subscribeDiv: CSSProperties = { position: 'relative', textAlign: 'center', color: 'white', padding: '2rem' };
    const subscribeButton: CSSProperties = { textAlign: 'center', backgroundColor: 'transparent', padding: '20px 25px', borderRadius: '0', border: '2px solid white'  };

        return { 
        mainBtn, 
        blackBtn,
        messageStyle,
        flex, 
        justifyCenter, 
        alignCenter, 
        column, 
        row, 
        textAlignCenter, 
        container, 
        section,
        sectionImageLeft,
        sectionStacked,
        title,
        subtitle,
        paragraph,
        hrStyle,
        specHrLight,
        imageStyle,
        warrantySliderImage,
        warrantySliderImgActive,
        registerDealerIcon,
        subscribeUpBgImg,
        registerUpButton,
        confirmAlert,
        carplayImageDiv,
        carplayImage,
        carplayLogo,
        testRideContainer,
        testRideContent,
        testRideImageCamping,
        testRideImageLuxor,
        subscribeDiv,
        subscribeButton
    };
}

export default MainStyles;
