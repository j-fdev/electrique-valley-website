// Modules
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import version from '../../config/version';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';
import { pathFor } from '../../config/routes';

const arrowPath = "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z";
const phonePath = "M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z";
const PHONE_DISPLAY = '450 747-1525';
const PHONE_LINK = 'tel:+14507471525';

/**
 * "Ready for a test ride?" call to action, shown on the home page and the series pages:
 * a full-width photo panel (cart on a forest trail) with the text on a dark gradient,
 * a contact button and a click-to-call link. The photo settles in with a slow zoom as it
 * scrolls into view (still with reduced motion).
 */
const TestRideSection: React.FC = () => {
    const T = translations.home;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    return (
        <section className="ev-section">
            <div className="ev-container">
                <div className="ev-testride ev-reveal ev-reveal--zoom">
                    <img className="ev-testride__photo" src={`/img/home/home-banner-forester-4plus-c-2.jpg?v=${version}`} alt="" loading="lazy" />
                    <div className="ev-testride__content">
                        <span className="ev-eyebrow ev-eyebrow--light">{L === 'en' ? 'Try it yourself' : 'Essayez-le'}</span>
                        <h2 className="ev-testride__title">{T.title_test_ride[L]}</h2>
                        <p>{T.p_test_ride[L]}</p>
                        <div className="ev-testride__actions">
                            <Link to={pathFor('contact', L)} className="ev-btn">
                                {T.btn_test_ride[L]}
                                <svg viewBox="0 0 448 512" aria-hidden="true"><path d={arrowPath} /></svg>
                            </Link>
                            <a href={PHONE_LINK} className="ev-btn ev-btn--ghost">
                                <svg viewBox="0 0 512 512" aria-hidden="true"><path d={phonePath} /></svg>
                                <span className="ev-sr-only">{L === 'en' ? 'Call' : 'Appeler le'} </span>
                                {PHONE_DISPLAY}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestRideSection;
