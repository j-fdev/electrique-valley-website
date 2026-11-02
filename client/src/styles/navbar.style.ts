

// Mobules
import { CSSProperties } from 'react';

// Hooks
import { useWindowSize } from './../hooks/useWindowSize';

const NavbarStyles = (isMenuOpen: boolean) => {
    const isMobile = useWindowSize();

    const navbarStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '72px',
        position: 'fixed',
        transition: 'background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
        top: '0',
        left: '0',
        zIndex: '1001',
        maxWidth: '100vw', // Keep this to prevent overflow
    };

    const navMenu: CSSProperties = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        background: 'rgba(10, 26, 43, 0.97)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        transform: 'translateX(0)', 
        transition: 'transform 0.3s ease-in-out',
        zIndex: '1002',
    };

    const navLogo: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: '1000',
        justifyContent: 'center',
        height: '100%',
    };

    const navMenuLogo: CSSProperties = {
        display: 'flex',
        zIndex: '1000',
        justifyContent: 'center',
        marginTop: '30px',
        height: 'auto',
    };

    const logoImg: CSSProperties = {
        marginLeft: isMobile ? '20px' : '60px',
        height: isMobile ? '40px' : '56px',
        marginTop: '0'
    };

    const menuLogoImg: CSSProperties = {    
        height: '40px',
    };

    const navLinks: CSSProperties = {
        display: isMobile ? 'none' : 'flex', 
        alignItems: 'center',
        height: '100%',
        marginRight: '48px',
        gap: '4px',
        flexDirection: 'row', 
    };

    const mobileNavLinks: CSSProperties = {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '20px',
        marginTop: '20px', 
    };

    const linkStyle: CSSProperties = {
        color: '#fff',
        fontFamily: 'var(--ev-font-head)',
        fontSize: isMobile ? '20px' : '15px',
        letterSpacing: '0.06em',
        textDecoration: 'none',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        fontWeight: '500',
    };

    const dropdown_content: CSSProperties = {
        position: 'absolute',
        top: '100%',
        left: '0',
        color: 'white',
        width: '100%', 
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        zIndex: 2000,
        marginTop: '0px',
        display: 'none', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: '30px',
        padding: '45px 30px 30px 30px', // Added 15px top padding for transparent area
        borderRadius: '0px 0px 24px 24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderTop: 'none',
        // Create transparent top section with backdrop blur only on content area
        background: `
            linear-gradient(to bottom, 
                transparent 0%, 
                transparent 15px, 
                rgba(10, 26, 43, 0.94) 15px, 
                rgba(10, 26, 43, 0.94) 100%
            )
        `,
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        // Ensure backdrop filter only applies to non-transparent area
        maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15px, black 15px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15px, black 15px, black 100%)',
    };
    
    const dropdown_content_visible: CSSProperties = {
        ...dropdown_content,
        display: 'block', // Show dropdown when visible
    };
    
    const dropdownItem: CSSProperties = {
        flex: '1 1 200px', 
        textAlign: 'center',
        padding: '15px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minWidth: '200px', 
        maxWidth: '300px', 
    };
    
    const dropdownImage: CSSProperties = {
        width: '200px',
        height: 'auto',
        marginBottom: '10px',
        borderRadius: '8px',
    };
    
    const dropdownText: CSSProperties = {
        fontSize: '16px',
        color: '#ffffff',
        margin: '8px 0 0 0',
        fontWeight: '600',
        letterSpacing: '0.5px',
    };

    const dropdownMenu: CSSProperties = { position: 'relative', display: 'block' };
    const firstLinkStyle = { ...linkStyle, borderLeft: isMobile ? 'none' : '1px solid #fff', };
    const dropdown: CSSProperties = { float: 'left', overflow: 'hidden'};
    const dropbtn: CSSProperties = {
        backgroundColor: 'transparent',
        color: 'white',
        padding: '0 16px',
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--ev-font-head)',
        fontWeight: '500',
        fontSize: isMobile ? '20px' : '15px',
        letterSpacing: '0.06em',
        gap: '6px',
        display: 'flex',
        alignItems: 'center',
        height: '40px',
    };

    const dropbtnHover: CSSProperties = { backgroundColor: '#0084B0' };
    const dropdownLinkStyles: CSSProperties = {
        display: 'block',
        color: 'white',
        padding: '12px 16px',
        textDecoration: 'none',
        textAlign: 'left',
        borderBottom: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
        fontFamily: 'var(--ev-font-head)',
        fontWeight: '500',
        fontSize: '16px',
    };

    // Style for hover effect
    const linkHoverStyles: CSSProperties = { backgroundColor: '#f1f1f1' };
    const hamburger: CSSProperties = {
        display: isMobile ? 'block' : 'none',
        zIndex: '1010',
        color: isMenuOpen ? 'var(--clr-brand-blue)' : 'white', 
        fontSize: '30px',
        cursor: 'pointer',
        position: 'absolute',
        top: '14px',
        right: '20px',
    };

    return {
        navbarStyle,
        navMenu,
        navLogo,
        navMenuLogo,
        logoImg,
        menuLogoImg,
        linkStyle,
        firstLinkStyle,
        dropdown,
        dropbtn,
        dropbtnHover,
        dropdownMenu,
        dropdown_content,
        dropdown_content_visible,
        dropdownItem,
        dropdownImage,
        dropdownText,
        navLinks,
        mobileNavLinks,
        dropdownLinkStyles,
        linkHoverStyles,
        hamburger,
    };
};

export default NavbarStyles;



