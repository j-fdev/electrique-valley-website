// Modules
import { CSSProperties } from 'react';
// import backgroundImage from '/img/home/home-banner-forester-4plus-c-2.webp';

const btn_form = { marginTop : '20px', padding : '10px 30px', width : '90%', backgroundColor: 'var(--clr-dark-gray)', color : 'white', border: 'none', cursor: 'pointer' };

const hoverBtn_form = {backgroundColor: 'var(--clr-light-blue)', };

const header = { display: 'flex', height: '100vh', background: 'linear-gradient(36deg, rgba(25,38,56,1) 0%, rgba(155,184,214,1) 60%, rgba(255,255,255,1) 80%)' };

const mobileCenteredForm: CSSProperties = { display: 'flex', marginInline: 'auto',textAlign: 'center', alignItems: 'center', position: 'relative', zIndex: '1' };

const leftSide: CSSProperties = { flex: '1', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '1' };

const rightSide: CSSProperties = { flex: '1.5', backgroundImage: `url(/img/home/home-banner-forester-4plus-c-2.webp)`, backgroundSize: 'cover', backgroundPosition: 'center right', backgroundRepeat: 'no-repeat', clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', backgroundColor: 'var(--clr-dark-gray)' };

const overlay: CSSProperties = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 };

const headerTitle = { fontSize: '20px', color: '#9bb8d6', marginBottom: '20px' };
  
const loginForm = { width: '300px', backgroundColor: '#192638', color: '#9bb8d6', padding: '20px', marginTop : '100px', border : '15px solid #9bb8d6', borderRadius: '8px', boxShadow: '0 4px 8px black' };
  
const inputContainer: CSSProperties = { position: 'relative', width: '100%', alignItems: 'center', borderBottom: '2px solid black', marginBottom: '20px' };
  
const input = (error: string) => ( {
    padding: '10px 10px 10px 40px', 
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: error ? '2px solid #850000' : '2px solid var(--clr-dark-gray)', 
    outline: 'none',
    borderRadius: '0', 
    // color: 'var(--clr-light-blue)', 
    color: 'white' 
});

const icon = { fontSize: '20px', color: 'var(--clr-light-blue)', marginRight: '10px' };
const logo = { width: '200px', display: 'block', marginInline : 'auto' };
const plink = { textDecoration: 'underline', fontsize: '20', fontWeight: '700', cursor: 'pointer' }
const hide = { display: 'none' }
const loginIcons = { width: '14px', height: '14px', fill: 'var(--clr-light-blue)' };                                                                                                                                                                          


const formStyles = {
    header, 
    mobileCenteredForm,
    leftSide, 
    rightSide,
    overlay, 
    headerTitle,
    loginForm, 
    input,
    btn_form,
    hoverBtn_form,
    logo, 
    inputContainer,
    icon,
    plink,
    hide,
    loginIcons
}

export default formStyles;