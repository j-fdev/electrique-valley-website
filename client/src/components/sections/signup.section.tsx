



// Modules
import React, { useContext } from 'react';

// Styles
import MainStyle from '../../styles/main.styles';

// Components
import Button from '../button/mainButton';

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';
import NewsletterModal from '../modal/newsletter.modal';

const SignupSection: React.FC = () => {
    const isMobile = useWindowSize();
    const mainStyle = MainStyle();

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
        <>
            <div style={mainStyle.subscribeUpBgImg}>
                <div style={mainStyle.container}>
                    <div style={ mainStyle.subscribeDiv }>
                        <h2 style={{...mainStyle.title, color: 'white' }}>{T.title_signup[L]}</h2>
                        <Button onClick={() => handleSignup()} customStyle={ mainStyle.subscribeButton}>{T.btn_signup[L]}</Button>
                        <p style={{...mainStyle.paragraph, marginInline: 'auto' }}>{T.p_sighup[L]}</p>
                    </div>
                    <div style={ { position: 'relative'}}>
                        {isOpenModal && <NewsletterModal {...modalProps} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupSection;

