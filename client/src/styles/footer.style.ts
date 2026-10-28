// Mobules
import { CSSProperties } from 'react';

// Hooks
import { useWindowSize } from './../hooks/useWindowSize';

const FooterStyle = () => {
    const isMobile = useWindowSize();

    const footerContainer: CSSProperties = { backgroundColor: 'black', color: 'white', padding: '2rem 0' };
    const col1: CSSProperties = { flex: 1, minWidth: '250px', marginBottom: isMobile ? '2rem' : '1rem', order: isMobile ? '3' : '1' };
    const col2: CSSProperties = { flex: 1, minWidth: '250px', marginBottom: isMobile ? '2rem' : '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', order: isMobile ? '1' : '2' };
    const col3: CSSProperties = { flex: 1, minWidth: '250px', display: 'flex', marginBottom: isMobile ? '2rem' : '1rem', flexDirection: 'column', alignItems: 'center', order: isMobile ? '2' : '3'};
    const link = { color: 'white', textDecoration: 'none', position: 'relative' as 'relative' };

    const dropdown_content: CSSProperties = {
        position: 'absolute',
        top: '100%',
        // right: '0',
        backgroundColor: "black",
        color: 'white',
        minWidth: '160px',
        boxShadow: '0px 4px 8px 0px var(--clr-brand-blue)',
        zIndex: '2000',
        marginTop: '10px',
    };

    const dropdownMenu: CSSProperties = { position: 'relative', display: 'inline-block' };
    const dropdown: CSSProperties = { float: 'left', overflow: 'hidden', position: 'relative' };
    const dropbtn: CSSProperties = { backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' };

    const dropdownLinkStyles: CSSProperties = {
        display: 'block',
        color: 'white',
        padding: '12px 16px',
        textDecoration: 'none',
        textAlign: 'left',
        borderBottom: '1px solid #ccc',
        fontFamily: 'Arial, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
    };

    const footerIcons = { width: '14px', height: '14px', fill: 'var(--clr-brand-blue)' };                                                                                                                                                                          
    
    return {
        footerContainer,
        col1,
        col2,
        col3,
        link,
        dropdown_content,
        dropbtn,
        dropdown,
        dropdownMenu,
        dropdownLinkStyles,
        footerIcons
    };
};

export default FooterStyle;