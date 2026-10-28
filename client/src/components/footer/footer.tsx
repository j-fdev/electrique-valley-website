// Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import version from './../../config/version';

// Hooks
import { useWindowSize } from './../../hooks/useWindowSize';
// Styles
import MainStyle from '../../styles/main.styles';
import FooterStyle from '../../styles/footer.style';
import NavbarStyles from './../../styles/navbar.style';
// Translations
import { translations } from '../../translations/trans.footer';
import { LanguageContext } from '../../translations/languageSelection';

const Footer: React.FC = () => {
    const mainStyle = MainStyle();
    const footerStyles = FooterStyle();
    const [isSeriesOpen, setIsSeriesOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navStyles = NavbarStyles(isMenuOpen);
    const isMobile = useWindowSize();

    const languageContext = React.useContext(LanguageContext); 
    const L = languageContext ? languageContext.language : 'en';
    const F = translations.footer;

        if (!languageContext) {
            return null; // or some fallback UI
        }
        const { language, setLanguage } = languageContext;
    
        const toggleLanguage = () => {
            const newLanguage = language === "en" ? "fr" : "en";
            setLanguage(newLanguage);
        };

    const handleLogout = async() => {
        // await btn_Logout();
    };

    return (
        <footer style={ footerStyles.footerContainer }>
            <div style={{ ...mainStyle.container, display: 'flex',  flexWrap: 'wrap' }}>
                <div style={ {...footerStyles.col1, textAlign: isMobile ? 'center' : 'unset'} }>
                    <img src={`/img/main/electriqueValleyLogo.png?v=${version}`} alt="Electrique Valley Logo" style={{ width: '100px', marginBottom: '1rem' }} />
                    <p style={{ maxWidth: '40ch'}}>{F.p_thanks[L]}</p>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '1.5rem', justifyContent: isMobile ? 'center' : 'unset' }}>
                        <a href="https://www.facebook.com/electriquevalley" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                <path fill="var(--clr-brand-blue)" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/electriquevalley?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                                <path fill="var(--clr-brand-blue)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                            </svg>                        
                        </a>
                    </div>
                </div>
           
                <div style={ footerStyles.col2 }>
                    <div style={{ width: '100%', maxWidth: '250px' }} onMouseLeave={() => {setIsSeriesOpen(false); setIsResourcesOpen(false);}}>
                        <h3 style={{ textAlign: isMobile ? 'center' : 'left', color: 'white' }}>{F.link_quick_links[L]}</h3>
                        <ul style={{ listStyle: 'none', marginTop: '1.5rem', padding: 0, textAlign: 'left' } }>
                            <li style={{ marginTop: '10px'}}><Link to="/" style={{ ...footerStyles.link }}>{F.link_home[L]}</Link></li>
                            <li style={{ marginTop: '10px'}}>
                                <div style={footerStyles.dropdownMenu} onMouseEnter={() => {setIsSeriesOpen(true); setIsResourcesOpen(false);}} >
                                    <div className="dropbtn" style={{...footerStyles.dropbtn}}>{F.link_our_series[L]} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='16' width='16'><path fill="white" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></div>
                                        <div className="dropdown-content" style={{ ...footerStyles.dropdown_content, display: isSeriesOpen ? 'grid' : 'none', }} onMouseLeave={() => setIsSeriesOpen(false)} >
                                            <Link to="/evolutionSeries" style={footerStyles.dropdownLinkStyles}>{F.link_evolution_series[L]}</Link>
                                            <Link to="/luxorSeries" style={footerStyles.dropdownLinkStyles}>{F.link_luxor_series[L]}</Link>
                                            <Link to="/classicSeries" style={footerStyles.dropdownLinkStyles}>{F.link_classic_series[L]}</Link>
                                            <Link to="/diabloSeries" style={footerStyles.dropdownLinkStyles}>{F.link_diablo_series[L]}</Link>
                                            {/* <Link to="/toraSeries" style={footerStyles.dropdownLinkStyles}>{F.link_tora_series[L]}</Link> */}
                                            <Link to="/thorSeries" style={footerStyles.dropdownLinkStyles}>{F.link_thor_series[L]}</Link>
                                            {/* <a href="#btn_logout" onClick={() => handleLogout()} style={footerStyles.dropdownLinkStyles}>{T.logout[L]}</a> */}
                                        </div>
                                </div>
                            </li>
                            <li style={{ marginTop: '10px'}}>
                                <div style={footerStyles.dropdownMenu} onMouseEnter={() => {setIsResourcesOpen(true); setIsSeriesOpen(false);}} >
                                    <div className="dropbtn" style={{...footerStyles.dropbtn}}>{F.link_ressources[L]} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='16' width='16'><path fill="white" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg></div>
                                        <div className="dropdown-content" style={{ ...footerStyles.dropdown_content, display: isResourcesOpen ? 'grid' : 'none', }} onMouseLeave={() => setIsResourcesOpen(false)} >
                                            <Link to="/videoShowcase" style={footerStyles.dropdownLinkStyles}>{F.link_video_showcase[L]}</Link>
                                            {/* <Link to="/classicSeries" style={footerStyles.dropdownLinkStyles}>{F.link_classic_series[L]}</Link> */}
                                        </div>
                                </div>
                            </li>
                            <li style={{ marginTop: '10px'}}><Link to="/contactUs" style={{ ...footerStyles.link }}>{F.link_contact_us[L]}</Link></li>
                            <li style={{ marginTop: '10px'}}><Link to="/login" style={{ ...footerStyles.link }}>{F.link_login[L]}</Link></li>
                            <button onClick={toggleLanguage} style={{ marginTop: '10px', backgroundColor: "transparent", color: "white", border: "none" }} >
                                {language === "en" ? "FR" : "EN"}
                            </button>
                            <li style={{ marginTop: '10px'}}><Link to="/termsAndConditions" style={{ ...footerStyles.link }}>{F.link_terms[L]}</Link></li>
                        </ul>
                    </div>
                </div>
      
                <div style={ footerStyles.col3 }>
                    <div style={{ width: '100%', maxWidth: '250px' }}>
                        <h3 style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '1.5rem', color: 'white' }}>{F.link_contact[L]}</h3>
                        <p style={{ textAlign: 'left', marginTop: '10px' }}><svg style={{...footerStyles.footerIcons}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> 1 (450) 747-1525</p>
                        <p style={{ textAlign: 'left', marginTop: '10px' }}><svg style={{...footerStyles.footerIcons}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg> info@electriquevalley.com</p>
                        <p style={{ textAlign: 'left', marginTop: '10px' }}><svg style={{...footerStyles.footerIcons}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM96 212.8c0-20.3 16.5-36.8 36.8-36.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-2.7 0-4.8 2.2-4.8 4.8c0 1.6 .8 3.1 2.2 4l29.4 19.6c10.3 6.8 16.4 18.3 16.4 30.7c0 20.3-16.5 36.8-36.8 36.8L112 304c-8.8 0-16-7.2-16-16s7.2-16 16-16l27.2 0c2.7 0 4.8-2.2 4.8-4.8c0-1.6-.8-3.1-2.2-4l-29.4-19.6C102.2 236.7 96 225.2 96 212.8zM372.8 176l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-2.7 0-4.8 2.2-4.8 4.8c0 1.6 .8 3.1 2.2 4l29.4 19.6c10.2 6.8 16.4 18.3 16.4 30.7c0 20.3-16.5 36.8-36.8 36.8L352 304c-8.8 0-16-7.2-16-16s7.2-16 16-16l27.2 0c2.7 0 4.8-2.2 4.8-4.8c0-1.6-.8-3.1-2.2-4l-29.4-19.6c-10.2-6.8-16.4-18.3-16.4-30.7c0-20.3 16.5-36.8 36.8-36.8zm-152 6.4L256 229.3l35.2-46.9c4.1-5.5 11.3-7.8 17.9-5.6s10.9 8.3 10.9 15.2l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48-19.2 25.6c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4L224 240l0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-6.9 4.4-13 10.9-15.2s13.7 .1 17.9 5.6z"/></svg> 1 (450) 747-1525</p>
                        <p style={{ textAlign: 'left', marginTop: '10px' }}><svg style={{...footerStyles.footerIcons}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg> Salaberry-de-Valleyfield, QC</p>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p>{F.copyrights[L]}</p>
            </div>
        </footer>
    );
};

export default Footer;


