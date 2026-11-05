// Modules
import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import version from './../../config/version';
import { findPage, pathFor, SERIES_PAGES } from './../../config/routes';

// Hooks
import { useWindowSize, NAV_BREAKPOINT } from './../../hooks/useWindowSize';

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
    const [isScrolled, setIsScrolled] = useState(window.scrollY > 50);
    const { pathname } = useLocation();
    const currentPage = findPage(pathname)?.page;
    const [isSeriesOpen, setIsSeriesOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navStyles = NavbarStyles(isMenuOpen);
    // Hamburger menu up to NAV_BREAKPOINT (not the usual 768 px): the links need more room
    const isMobile = useWindowSize(NAV_BREAKPOINT);

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
            setIsScrolled(window.scrollY > 50);
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
        <div style={{
            ...navStyles.navbarStyle,
            background: isScrolled || isMenuOpen ? 'rgba(10, 26, 43, 0.86)' : 'linear-gradient(180deg, rgba(6, 17, 29, 0.7) 0%, rgba(6, 17, 29, 0) 100%)',
            backdropFilter: isScrolled ? 'blur(14px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'none',
            boxShadow: isScrolled ? '0 10px 30px rgba(6, 17, 29, 0.25)' : 'none',
        }}>
            {/* Logo Section - Left Side */}
            <div style={navStyles.navLogo}>
                <Link to={pathFor('home', L)} onClick={handleLinkClick}>
                    <img src={`/img/main/navBrandLogo.png?v=${version}`} alt="Electrique Valley" style={navStyles.logoImg} />
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
                        <Link to={pathFor('home', L)} onClick={handleLinkClick}>
                            <img src={`/img/main/navBrandLogo.png?v=${version}`} alt="Electrique Valley" style={navStyles.menuLogoImg} />
                        </Link>
                    </div>
                )}
                {(isMobile && isMenuOpen) || !isMobile ? (
                    <>
                        <Link to={pathFor('home', L)} className={`ev-nav-link${currentPage === 'home' ? ' is-active' : ''}`} style={navStyles.linkStyle} onClick={handleLinkClick}>
                            {T.home[L]}
                        </Link>
                        <div className="dropdown" style={navStyles.dropdownMenu} onMouseEnter={() => { setIsSeriesOpen(true); setIsResourcesOpen(false); }} onMouseLeave={() => setIsSeriesOpen(false)}>
                            <div className={`dropbtn ev-nav-link${currentPage && SERIES_PAGES.includes(currentPage) ? ' is-active' : ''}`} style={navStyles.dropbtn} onClick={() => { setIsSeriesOpen(!isSeriesOpen); setIsResourcesOpen(false); }}>
                                {T.our_series[L]}&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16">
                                    <path fill="white" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </div>
                            {!isMobile && (
                                <>
                                    {/* Invisible bridge for hover continuity. Hover is handled by the parent .dropdown only:
                                        its mouseenter/mouseleave already cover these children, and separate handlers here
                                        closed the menu when the pointer moved from the bridge back up to the link.
                                        The bridge exists only while the menu is open, so crossing it from below doesn't open the menu. */}
                                    {isSeriesOpen && <div style={{ position: 'fixed', left: 0, width: '100vw', top: '57px', height: '15px', zIndex: 1999, backgroundColor: 'transparent' }}></div>}
                                    <div className="dropdown-content ev-mega" style={{ ...navStyles.dropdown_content, display: isSeriesOpen ? 'flex' : 'none', position: 'fixed', left: 0, width: '100vw', top: '57px', justifyContent: 'center' }}>
                                        <div className="ev-nav-item" style={navStyles.dropdownItem}>
                                            <Link to={pathFor('dmax', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/d-max/XT4/Evolution4L-color-BLACK-SAPPHIRE.webp" alt="" loading="lazy" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.dMax_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div className="ev-nav-item" style={navStyles.dropdownItem}>
                                            <Link to={pathFor('luxor', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/luxor/luxor_2+2L/LUXOR_2+2L-MEDITERRANEAN-BLUE.webp" alt="" loading="lazy" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.luxor_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div className="ev-nav-item" style={navStyles.dropdownItem}>
                                            <Link to={pathFor('classic', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/classic/classic_2+2/sky-BLUE.webp" alt="" loading="lazy" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.classic_serie[L]}</p>
                                            </Link>
                                        </div>
                                        <div className="ev-nav-item" style={navStyles.dropdownItem}>
                                            <Link to={pathFor('thor', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src={`/img/thor/Thor-GREEN-shadow.webp?v=${version}`} alt="" loading="lazy" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.thor_serie[L]}</p>
                                            </Link>
                                        </div>
                                        {/* Elite hidden for now */}
                                        {/* <div className="ev-nav-item" style={navStyles.dropdownItem}>
                                            <Link to={pathFor('elite', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                                <img src="/img/elite/Elite_4/Elite_4_blue_nobg.webp" alt="Elite Series" style={navStyles.dropdownImage} />
                                                <p style={navStyles.dropdownText}>{T.elite_serie[L]}</p>
                                            </Link>
                                        </div> */}
                                    </div>
                                </>
                            )}
                            {isMobile && (
                                <div className="dropdown-content" style={{...navStyles.dropdown_content, display: isSeriesOpen ? 'block' : 'none', position: 'relative', width: 'auto', top: 'auto' }}>
                                    <Link to={pathFor('dmax', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.dMax_serie[L]}
                                    </Link>
                                    <Link to={pathFor('luxor', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.luxor_serie[L]}
                                    </Link>
                                    <Link to={pathFor('classic', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.classic_serie[L]}
                                    </Link>
                                    <Link to={pathFor('thor', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.thor_serie[L]}
                                    </Link>
                                    {/* Elite hidden for now */}
                                    {/* <Link to={pathFor('elite', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                        {T.elite_serie[L]}
                                    </Link> */}
                                </div>
                            )}
                        </div>
                        <div className="dropdown" style={navStyles.dropdownMenu} onMouseEnter={() => { setIsResourcesOpen(true); setIsSeriesOpen(false); }} onMouseLeave={() => setIsResourcesOpen(false)}>
                            <div className={`dropbtn ev-nav-link${currentPage === 'videos' ? ' is-active' : ''}`} style={navStyles.dropbtn} onClick={() => { setIsResourcesOpen(!isResourcesOpen); setIsSeriesOpen(false); }}>
                                {T.ressources[L]}&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16">
                                    <path fill="white" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                </svg>
                            </div>
                            <div className="dropdown-content ev-mega" style={{...navStyles.dropdown_content, display: isResourcesOpen ? 'block' : 'none', minWidth: '240px', padding: '30px 10px 10px', borderRadius: '0 0 18px 18px' }}>
                                <Link to={pathFor('videos', L)} style={navStyles.dropdownLinkStyles} onClick={handleLinkClick}>
                                    {T.video_showcase[L]}
                                </Link>
                            </div>
                        </div>
                        <Link to={pathFor('contact', L)} className="ev-nav-cta" style={{ ...navStyles.linkStyle, height: 'auto' }} onClick={handleLinkClick}>
                            {T.contact_us[L]}
                        </Link>
                        <button className="ev-lang-btn" onClick={toggleLanguage} aria-label="Change language">
                            {language === "en" ? "FR" : "EN"}
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;