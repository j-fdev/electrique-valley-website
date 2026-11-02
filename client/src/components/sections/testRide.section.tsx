// Modules
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import version from '../../config/version';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';

// Cart shown in front of the photo, depending on the page
const cartByPage: [string, string][] = [
    ['luxorSeries', '/img/luxor/luxor_2+2L/LUXOR_2+2L-SKY-BLUE.png'],
    ['thorSeries', '/img/thor/Thor-GREEN.png'],
    ['diabloSeries', '/img/diablo/diablo2.png'],
    ['classicSeries', '/img/classic/classic_2+2/sky-BLUE.png'],
    ['evolutionSeries', '/img/d-max/XT4/Evolution4L-color-PORTIMAO-BLUE.png'],
    ['eliteSeries', '/img/elite/Elite_4/Elite_4L_black_nobg.png'],
];

const TestRideSection: React.FC = () => {
    const { pathname } = useLocation();
    const T = translations.home;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const match = cartByPage.find(([page]) => pathname.includes(page));
    const cartImage = `${match ? match[1] : cartByPage[0][1]}?v=${version}`;

    return (
        <section className="ev-section">
            <div className="ev-container ev-testride">
                <div className="ev-reveal ev-reveal--left">
                    <span className="ev-eyebrow">{L === 'en' ? 'Try it yourself' : 'Essayez-le'}</span>
                    <h2 className="ev-section-title ev-section-title--left">{T.title_test_ride[L]}</h2>
                    <p>{T.p_test_ride[L]}</p>
                    <Link to="/contact" className="ev-btn ev-btn--dark">
                        {T.btn_test_ride[L]}
                        <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </Link>
                </div>
                <div className="ev-testride__visual ev-reveal ev-reveal--right">
                    <img className="ev-testride__photo" src={`/img/main/camping.jpg?v=${version}`} alt="" loading="lazy" />
                    <img className="ev-testride__cart" src={cartImage} alt="" loading="lazy" />
                </div>
            </div>
        </section>
    );
};

export default TestRideSection;
