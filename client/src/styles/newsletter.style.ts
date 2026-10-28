// Modules
import { CSSProperties } from 'react';
// Hooks  
import { useWindowSize } from '../hooks/useWindowSize';

const NewsletterStyles = () => {
    const isMobile = useWindowSize();

    const newsletterContainer: CSSProperties = { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: isMobile ? 'calc(100vw - 40px)' : 'auto', // Better mobile width with more margin
        maxWidth: isMobile ? '360px' : '900px', // Ensure it doesn't exceed content width
        height: 'auto', 
        minHeight: '330px',
        gap: '1rem', 
        padding: '2rem 1rem',
        zIndex: '1000', // Increased z-index to ensure it's above other content
        position: 'fixed', // Changed from absolute to fixed
        top: '50%', // Center vertically in viewport
        left: '50%', 
        transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
        maxHeight: '90vh', // Prevent overflow on small screens
        overflow: 'auto', // Allow scrolling if content is too tall
        boxSizing: 'border-box', // Include padding in dimensions
    };
    const newsletterTitle: CSSProperties = { fontSize: 'clamp(1.875rem, 1.4349rem + 1.8779vw, 3.125rem)', fontWeight: '800', textAlign: 'center' };
    const newsletterForm: CSSProperties = { 
        display: 'flex', 
        flexDirection: 'column', 
        marginInline: 'auto', 
        textAlign: 'center', 
        width: isMobile ? '90%' : '400px',
        color: 'white', 
        gap: '1rem' 
    };
    const newsletterInput: CSSProperties = { 
        padding: '0.5rem', 
        width: '100%',
        border: '1px solid var(--clr-brand-blue)', 
        borderRadius: '2px', 
        fontSize: '1rem', 
        textAlign: 'center' 
    };
    const newsletterButton: CSSProperties = { 
        width: '100%',
        padding: '0.5rem 1rem', 
        backgroundColor: 'var(--clr-brand-blue)', 
        color: 'white', 
        border: 'none', 
        borderRadius: '2px', 
        cursor: 'pointer' 
    };
    const newsletterButtonClose: CSSProperties = { position: 'absolute', top: '15px', right: '15px', width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none' };
    const newsletterError: CSSProperties = { color: 'red', fontSize: '0.8rem' };    
    const newsletterSuccess: CSSProperties = { color: 'green', fontSize: '0.8rem' };

    return {
        newsletterContainer,
        newsletterTitle,
        newsletterForm,
        newsletterInput,
        newsletterButton,
        newsletterButtonClose,
        newsletterError,
        newsletterSuccess
    };

};

export default NewsletterStyles;