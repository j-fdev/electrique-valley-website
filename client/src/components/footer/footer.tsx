// Modules
import React from 'react';
import { Link } from 'react-router-dom';
import version from './../../config/version';

// Translations
import { translations } from '../../translations/trans.footer';
import { legal } from '../../translations/trans.legal';
import { LanguageContext } from '../../translations/languageSelection';

const Footer: React.FC = () => {
    const languageContext = React.useContext(LanguageContext);
    const F = translations.footer;

    if (!languageContext) {
        return null;
    }
    const { language: L, setLanguage } = languageContext;
    const toggleLanguage = () => setLanguage(L === 'en' ? 'fr' : 'en');
    const copyright = F.copyrights[L].replace(/\d{4}/, String(new Date().getFullYear()));

    const series = [
        { to: '/dmaxSeries', label: F.link_evolution_series[L] },
        { to: '/eliteSeries', label: F.link_elite_series[L] },
        { to: '/luxorSeries', label: F.link_luxor_series[L] },
        { to: '/classicSeries', label: F.link_classic_series[L] },
        { to: '/thorSeries', label: F.link_thor_series[L] },
    ];

    return (
        <footer className="ev-footer">
            <div className="ev-container">
                <div className="ev-footer__grid ev-stagger">
                    {/* Brand */}
                    <div>
                        <img className="ev-footer__logo" src={`/img/main/electriqueValleyLogo.png?v=${version}`} alt="Électrique Valley" />
                        <p style={{ maxWidth: '40ch' }}>{F.p_thanks[L]}</p>
                        <div className="ev-footer__social">
                            <a href="https://www.facebook.com/electriquevalley" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/electriquevalley" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Series */}
                    <div>
                        <h3>{F.link_our_series[L]}</h3>
                        <ul>
                            {series.map((s) => (
                                <li key={s.to}><Link to={s.to}>{s.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3>{F.link_quick_links[L]}</h3>
                        <ul>
                            <li><Link to="/">{F.link_home[L]}</Link></li>
                            <li><Link to="/videoShowcase">{F.link_video_showcase[L]}</Link></li>
                            <li><Link to="/contact">{F.link_contact_us[L]}</Link></li>
                            <li><Link to="/contact?source=becomeDealer">{L === 'en' ? 'Become a dealer' : 'Devenir revendeur'}</Link></li>
                            <li><Link to="/privacy">{legal.links.privacy[L]}</Link></li>
                            <li><Link to="/termsAndConditions">{legal.links.terms[L]}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3>{F.link_contact[L]}</h3>
                        <ul className="ev-footer__contact">
                            <li>
                                <svg viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                                <a href="tel:+14507471525">1 (450) 747-1525</a>
                            </li>
                            <li>
                                <svg viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>
                            </li>
                            <li>
                                <svg viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                <span>Salaberry-de-Valleyfield, QC</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="ev-footer__bottom">
                    <p style={{ margin: 0 }}>{copyright}</p>
                    <div className="ev-footer__legal">
                        <Link to="/privacy">{legal.links.privacy[L]}</Link>
                        <Link to="/termsAndConditions">{legal.links.terms[L]}</Link>
                        <a href="https://tyrem.ca" target="_blank" rel="noopener">{legal.links.credit[L]}</a>
                        <button className="ev-footer__lang" onClick={toggleLanguage}>{L === 'en' ? 'Français' : 'English'}</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
