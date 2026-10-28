// Mobules
import { CSSProperties } from 'react';

// Hooks
import { useWindowSize } from './../hooks/useWindowSize';

const ContactStyle = () => {
    const isMobile = useWindowSize();

    const contactSection: CSSProperties = { display: 'flex', flexDirection: 'row', flexWrap: isMobile ? 'wrap' : 'nowrap', minHeight: '92hv', paddingLeft: isMobile ? '0' :'8%' };
    const contactContainer: CSSProperties = { display: 'flex', flexDirection: 'column', flexWrap: isMobile ? 'wrap' : 'nowrap', rowGap: isMobile ? '20px' : '60px', padding: '3% 0', paddingLeft: isMobile ? '8%' : '0', zIndex: 1 };
    const contactH1: CSSProperties = { textAlign: 'left', fontSize: 'clamp(3.25rem, 2.1937rem + 4.5070vw, 6.25rem)', fontWeight: '300' };
    const contactTextContent: CSSProperties = { display: 'flex', flexDirection: 'column', flexWrap: isMobile ? 'wrap' : 'nowrap', rowGap: '20px', columnGap: '20px' };
    const contactIcons: CSSProperties = { width: '45px', height: '45px', fill: 'var(--clr-dark-blue)' };
    const contactImgContainer: CSSProperties = { width: '100%', height: isMobile ? '240px' : '780px', order: isMobile ? -1 : 1 };
    const contactImg: CSSProperties = { width: '100%', height: isMobile ? '240px' : '780px', objectFit: 'cover' };
    const contactFormSection: CSSProperties = { display: 'flex', flexDirection: 'column', backgroundColor: 'var(--clr-black)', color: 'white', marginTop: '2%', padding: '0 8%', paddingBottom: '8%', gap: '60px 60px', rowGap: '60px', columnGap: '60px'};
    const formInput: CSSProperties = { color: 'white', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 400, padding: '10px', margin: '10px 0', width: '100%' };
    const formRow: CSSProperties = { display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: '20px' };
    const formCol: CSSProperties = { flex: '1', minWidth: isMobile ? '100%' : 'calc(50% - 20px)' };
    const formButton: CSSProperties = { backgroundColor: 'transparent', color: 'white', border: '2px solid white', padding: '15px 45px', cursor: 'pointer', textAlign: 'center', margin: '20px auto 0', display: 'block' };
    const inputErrors: CSSProperties = { color: 'red', margin: 0 };
    const errorDiv: CSSProperties = { minHeight: '20px', paddingLeft: '10px', textAlign: 'left', fontSize: '12px'};

    return {
        contactSection,
        contactContainer,
        contactH1,
        contactTextContent,
        contactIcons,
        contactImgContainer,
        contactImg,
        contactFormSection,
        formInput,
        formRow,
        formCol,
        formButton,
        inputErrors,
        errorDiv
    };
};

export default ContactStyle;