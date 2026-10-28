

// Modules
import React, { useState, useContext } from 'react';

// Styles
import MainStyle from '../../styles/main.styles';

// Components
import Button from '../../components/button/mainButton';

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';
import { Link } from 'react-router-dom';

const BecomeDealer: React.FC = () => {
    const isMobile = useWindowSize();
    const mainStyle = MainStyle();

    const T = translations.home; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

     const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <div style={mainStyle.section}>
        <div style={{ ...mainStyle.container, textAlign: 'center' }}>
            <div>
                <svg style={ mainStyle.registerDealerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h48v48H0z" fill="none"></path>
                </svg>
            </div>
            <h2 style={mainStyle.title}>{T.title_register_become_dealer[L]}</h2>
            <p style={{...mainStyle.paragraph, marginInline: 'auto', maxWidth: 'auto'}}>{T.subtitle_register_become_dealer[L]}</p>
            <Link to="/contact?source=becomeDealer">
                <Button customStyle={{ ...mainStyle.registerUpButton, transform: isButtonHovered ? 'translateY(-5px)' : 'none' }} onHoverChange={setIsButtonHovered} >
                    {T.btn_register_dealer[L]}      
                </Button>
            </Link>
        </div>
    </div>
    );
}

export default BecomeDealer;