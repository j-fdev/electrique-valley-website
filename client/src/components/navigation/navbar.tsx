// Modules
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import version from './../../config/version';

// Hooks
import { useWindowSize } from './../../hooks/useWindowSize';

// Styles
import NavbarStyles from './../../styles/navbar.style';

// Api
// import { btn_Logout } from './../../api/api';

// Translations
import { translations } from '../../translations/trans.navbar';
import { LanguageContext } from '../../translations/languageSelection';

interface i_navbar_props {
    // setAuth: (auth: boolean) => void;
    children: React.ReactNode;
}   

const Navbar: React.FC = () => {
    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const [isSeriesOpen, setIsSeriesOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navStyles = NavbarStyles(isMenuOpen);
    const isMobile = useWindowSize();

    const languageContext = useContext(LanguageContext);
    const language = languageContext ? languageContext.language : 'en';
    const setLanguage = languageContext ? languageContext.setLanguage : () => {};

    const T = translations.navbar;
    const L = language;

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "fr" : "en";
        setLanguage(newLanguage);
    };

    const toggleMenu = () => {  
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleLogout = async() => {
        // await btn_Logout();
    };

    const handleLinkClick = () => {
        // Close dropdowns when navigating
        setIsSeriesOpen(false);
        setIsResourcesOpen(false);
        
        if (isMobile) {
            setIsMenuOpen(false);
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBackgroundColor('black');
            } else {
                setBackgroundColor('transparent');
            }
        };

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Element;
            if (!target.closest('.dropdown')) {
                setIsSeriesOpen(false);
                setIsResourcesOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    if (!languageContext) {
        return null; // or some fallback UI
    }


    return (
        <div style={{ backgroundColor, ...navStyles.navbarStyle }}>
            {/* Logo Section - Left Side */}
            <div style={navStyles.navLogo}>
                <Link to="/" onClick={handleLinkClick}>
                    <img src={`/img/main/navBrandLogo.png?v=${version}`} alt="Logo" style={navStyles.logoImg} />
                </Link>
            </div>

            {/* Mobile Hamburger Menu */}
            {isMobile && (
                <div style={navStyles.hamburger} onClick={toggleMenu}>
                    &#9776;
                </div>
            )}

            {/* Links Section - Right Side */}
            <div style={isMenuOpen ? navStyles.navMenu : navStyles.navLinks}>
                {isMobile && isMenuOpen && (
                    <div style={navStyles.navMenuLogo}>
                        <Link to="/" onClick={handleLinkClick}>
                            <img src={`/img/main/navBrandLogo.png?v=${version}`} alt="Logo" style={navStyles.menuLogoImg} />
                        </Link>
                    </div>
                )}
                {(isMobile && isMenuOpen) || !isMobile ? (
                    <>
                        <Link to="/" style={isMobile ? navStyles.linkStyle : navStyles.linkStyle} onClick={handleLinkClick}>
                            {T.home[L]}
                        </Link>
                        <div className="dropdown" style={navStyles.dropdownMenu} onMouseEnter={() => { setIsSeriesOpen(true); setIsResourcesOpen(false); }} onMouseLeave={() => setIsSeriesOpen(false)}>
                            <div className="dropbtn" style={{...navStyles.dropbtn, borderLeft: isMobile ? 'none' : '1px solid #fff'}} onClick={() => { setIsSeriesOpen(!isSeriesOpen); setIsResourcesOpen(false); }}>
                                {T.our_series[L]}&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16">
                                    <path fill="white" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </div>
                            {!isMobile && (
                                <>
                                    {/* Invisible bridge for hover continuity */}
                                    <div style={{ position: 'fixed', left: 0, width: '100vw', top: '50px', height: '15px', zIndex: 1999, backgroundColor: 'transparent' }} onMouseEnter={() => setIsSeriesOpen(true)} onMouseLeave={() => setIsSeriesOpen(false)}></div>
                                    <div className="dropdown-content" style={{ ...navStyles.dropdown_content, display: isSeriesOpen ? 'flex' : 'none', position: 'fixed', left: 0, width: '100vw', top: '50px' }} onMouseEnter={() => setIsSeriesOpen(true)} onMouseLeave={() => setIsSeriesOpen(false)}>
                                        <div style={navStyles.dropdownItem}>
                                            <Link to="/evolutionSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/d-max/XT4/Evolution4L-color-BLACK-SAPPHIRE.png" alt="Evolution Series" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.dMax_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div style={navStyles.dropdownItem}>
                                            <Link to="/luxorSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/luxor/luxor_2+2L/LUXOR_2+2L-MEDITERRANEAN-BLUE.png" alt="Luxor Series" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.luxor_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div style={navStyles.dropdownItem}>
                                            <Link to="/classicSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/classic/classic_2+2/sky-BLUE.png" alt="Classic Series" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.classic_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div style={{...navStyles.dropdownItem, marginTop: '14px'}}>
                                            <Link to="/diabloSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/diablo/diablo_4_img_no_bg.png" alt="Diablo Series" style={{...navStyles.dropdownImage, width: '110px'}} />
                                                <p style={navStyles.dropdownText}>{T.diablo_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div style={navStyles.dropdownItem}>
                                            <Link to="/thorSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/thor/Thor-GREEN.png" alt="Thor Series" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.thor_serie[L]}</p>
                                            </Link>
                                        </div>
                                         <div style={navStyles.dropdownItem}>
                                            <Link to="/eliteSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/elite/Elite_4/Elite_4_blue_nobg.png" alt="Elite Series" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.elite_serie[L]}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                            {isMobile && (
                                <div className="dropdown-content" style={{...navStyles.dropdown_content, display: isSeriesOpen ? 'block' : 'none', position: 'relative', width: 'auto', top: 'auto' }}>
                                    <Link to="/evolutionSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.dMax_serie[L]}
                                    </Link>
                                    <Link to="/luxorSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.luxor_serie[L]}
                                    </Link>
                                    <Link to="/classicSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.classic_serie[L]}
                                    </Link>
                                    <Link to="/diabloSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.diablo_serie[L]}
                                    </Link>
                                    <Link to="/thorSeries" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.thor_serie[L]}
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="dropdown" style={navStyles.dropdownMenu} onMouseEnter={() => { setIsResourcesOpen(true); setIsSeriesOpen(false); }} onMouseLeave={() => setIsResourcesOpen(false)}>
                            <div className="dropbtn" style={{...navStyles.dropbtn, borderLeft: isMobile ? 'none' : '1px solid #fff'}} onClick={() => { setIsResourcesOpen(!isResourcesOpen); setIsSeriesOpen(false); }}>
                                {T.ressources[L]}&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16">
                                    <path fill="white" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </div>
                            <div className="dropdown-content" style={{...navStyles.dropdown_content, display: isResourcesOpen ? 'block' : 'none' }} onMouseEnter={() => setIsResourcesOpen(true)} onMouseLeave={() => setIsResourcesOpen(false)}>
                                <Link to="/videoShowcase" style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                    {T.video_showcase[L]}
                                </Link>
                            </div>
                        </div>
                        <Link to="/contact" style={{...navStyles.linkStyle, borderRight: isMobile ? 'none' : '1px solid #fff'}} onClick={handleLinkClick}>
                            {T.contact_us[L]}
                        </Link>
                        <button onClick={toggleLanguage} style={{ marginLeft: "10px", padding: "5px 10px", backgroundColor: "transparent", color: "#FFF", border: "none" }} >
                            {language === "en" ? "FR" : "EN"}
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;