

// Modules
import React, { useState, useEffect } from "react";
import version from './../../config/version';

// Styles
import formStyles from "./../../styles/loginForm.styles";

// Hooks
import { useWindowSize } from './../../hooks/useWindowSize';

// Interfaces
import { i_login_form_props } from '../../interfaces/interfaces';

// Translations
import { translations } from '../../translations/trans.login';
import { LanguageContext } from '../../translations/languageSelection';

const LoginForm = (props: i_login_form_props) => {
    const isMobile = useWindowSize();
    const [isVisible, setIsVisible] = useState(false);
    const [formErrVisible, setFormErrVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const languageContext = React.useContext(LanguageContext); 
    const { language, setLanguage } = languageContext || { language: 'en', setLanguage: () => {} };
    const T = translations.login;

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "fr" : "en";
        setLanguage(newLanguage);
    };

    // Update placeholder text when language changes
    useEffect(() => {
        props.setPlaceholderEmail(T.placeHolder_email[language]);
        props.setPlaceholderPword(T.placeHolder_password[language]);
    }, [language, T.placeHolder_email, T.placeHolder_password, props]);

    // Combine default and hover styles conditionally
    const combinedButtonStyles = {
        ...formStyles.btn_form,
        ...(isHovered ? formStyles.hoverBtn_form : {}), // Apply hover styles if hovered
    };

    useEffect(() => {
        if (props.error.email || props.error.password || props.error.allFields) {
            setFormErrVisible(true);

            // Hide the error message after 2 seconds
            const timer = setTimeout(() => {
                setFormErrVisible(false);
                props.clearErrors();
            }, 2000);

            // Cleanup the timer when the component unmounts or error changes
            return () => clearTimeout(timer);
        }
    }, [props.error]);

    return (
        <form style={{...formStyles.loginForm, marginTop: isMobile ? '50px' : '100px'}} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    props.callback();
                }
            }}
        >
            <style>
                {`
                input::placeholder {
                    color: var(--clr-light-blue);
                    opacity: 1;  
                }
                `}
            </style>
            <img src={`/img/main/Logo3d.png?v=${version}`} alt="Logo" style={formStyles.logo} />
            <p style={formStyles.headerTitle}>{T.h2_hero[language]}</p>
         
            <div style={formStyles.inputContainer}>
                <svg style={{...formStyles.loginIcons}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg>
                <input style={formStyles.input(props.error.email ?? '')} name="email" type="email" value={props.email} placeholder={props.placeholderEmail} onChange={(e) => props.setEmail(e.target.value)} onFocus={() => props.setPlaceholderEmail('')} onBlur={() => props.email === '' && props.setPlaceholderEmail(T.placeHolder_email[language])} required />
            </div>
            <div style={formStyles.inputContainer}>
                <svg style={{...formStyles.loginIcons}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                <input style={formStyles.input(props.error.password ?? '')} name="password" type="password" value={props.password} placeholder={props.placeholderPword} onChange={(e) => props.setPassword(e.target.value)} onFocus={() => props.setPlaceholderPword('')} onBlur={() => props.password === '' && props.setPlaceholderPword(T.placeHolder_password[language])} required />
            </div>

            {formErrVisible && (
                <p style={{ color: '#850000', border: '1px solid var(--clr-light-blue)', backgroundColor: 'var(--clr-light-blue)' }} >
                    {props.error.email ? `${props.error.email} ` : ''}
                    {props.error.password ? `${props.error.password}` : ''}
                    {props.error.allFields ? `${props.error.allFields}` : ''}
                </p>
            )}

            <button style={combinedButtonStyles} type="button" onClick={() => props.callback()} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;