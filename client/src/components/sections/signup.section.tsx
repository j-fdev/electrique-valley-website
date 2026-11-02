



// Modules
import React, { useContext } from 'react';

// Styles

// Components

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';
import NewsletterModal from '../modal/newsletter.modal';

const SignupSection: React.FC = () => {
    const isMobile = useWindowSize();

    const T = translations.home; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isEmailSubmitted, setIsEmailSubmitted] = React.useState(false);

    const handleSignup = () => {
        setIsOpenModal(true);
    };

    const modalProps = {
        isOpen: isOpenModal,
        setIsOpen: setIsOpenModal,
        email,
        emailError,
        isEmailValid,
        isEmailSubmitted
    };

    return (
        <section className="ev-newsletter" style={{ backgroundImage: 'url(/img/home/camping-night-scaled.jpg)' }}>
            <div className="ev-newsletter__card ev-reveal ev-reveal--zoom">
                <span className="ev-eyebrow ev-eyebrow--light">Newsletter</span>
                <h2>{T.title_signup[L]}</h2>
                <button className="ev-btn" onClick={() => handleSignup()}>{T.btn_signup[L]}</button>
                <p>{T.p_sighup[L]}</p>
            </div>
            {isOpenModal && <NewsletterModal {...modalProps} />}
        </section>
    );
}

export default SignupSection;

