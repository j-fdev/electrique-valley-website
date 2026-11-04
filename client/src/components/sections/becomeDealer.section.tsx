// Modules
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';
import { pathFor } from '../../config/routes';

const BecomeDealer: React.FC = () => {
    const T = translations.home;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    return (
        <section className="ev-section" style={{ paddingTop: 0 }}>
            <div className="ev-container">
                <div className="ev-cta-band ev-reveal ev-reveal--zoom">
                    <div className="ev-cta-band__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
                        </svg>
                    </div>
                    <div>
                        <h2>{T.title_register_become_dealer[L]}</h2>
                        <p>{T.subtitle_register_become_dealer[L]}</p>
                    </div>
                    <Link to={`${pathFor('contact', L)}?source=becomeDealer`} className="ev-btn ev-btn--ghost">
                        {T.btn_register_dealer[L]}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BecomeDealer;
