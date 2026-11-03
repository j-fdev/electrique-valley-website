// Modules
import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Styles
import MainStyle from '../../styles/main.styles';
import ContactStyle from '../../styles/contact.style';
import formStyles from "./../../styles/loginForm.styles";
import styles from './../../styles/contact.module.css';

// Interfaces
import { i_contact_form_props } from '../../interfaces/interfaces';

// Translations
import { translations } from '../../translations/trans.contact';
import { legal } from '../../translations/trans.legal';
import { LanguageContext } from '../../translations/languageSelection';
import { ClipLoader } from 'react-spinners';

const ContactForm = (props: i_contact_form_props ) => {
    const mainStyle = MainStyle();
    const contactStyles = ContactStyle();
    
    const F = props.form || {};
    const E = props.error;
    const T = translations.contact; 
    const languageContext = useContext(LanguageContext);
    const { language, setLanguage } = languageContext || { language: 'en', setLanguage: () => {} };

    const [isNotContactUs, setIsNotContactUs] = useState(false);
    const [formErrVisible, setFormErrVisible] = useState(false);
    const [consent, setConsent] = useState(false);           // Law 25: unchecked by default
    const [consentError, setConsentError] = useState(false);
    
    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "fr" : "en";
        setLanguage(newLanguage);
    };

    const location = useLocation();

    const handleField = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name , value } = event.target
        props.setForm({...F , [name] : value})
        props.setError({ ...E, [name]: '' });
    } 
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const source = queryParams.get('source');
        if (source === 'becomeDealer' || source === 'findDealer') {
            setIsNotContactUs(true);
        } else {
            setIsNotContactUs(false);
        }
    }, [location.search]);

    // Update placeholder text when language changes
    useEffect(() => {
        props.setPlaceholderFirstName(T.placeHolder_firstName[language]);
        props.setPlaceholderLastName(T.placeHolder_lastName[language]);
        props.setPlaceholderPhone(T.placeHolder_phone[language]);
        props.setPlaceholderEmail(T.placeHolder_email[language]);
        props.setPlaceholderBusinessName(T.placeHolder_business_name[language]);
        props.setPlaceholderTown(T.placeHolder_town[language]);
        props.setPlaceholderProvince(T.placeHolder_province[language]);
        props.setPlaceholderMessage(T.placeHolder_message[language]);
    }, [language, T.placeHolder_firstName, T.placeHolder_lastName, T.placeHolder_phone, T.placeHolder_email, T.placeHolder_message, props]);

    useEffect(() => {
        if (E.first_name || E.last_name || E.email || E.phone_number || E.business_name || E.province || E.town || E.message) {
            setFormErrVisible(true);

            // Hide the error message after 2 seconds
            const timer = setTimeout(() => {
                setFormErrVisible(false);
                props.clearErrors();
            }, 2000);

            // Cleanup the timer when the component unmounts or error changes
            return () => clearTimeout(timer);
        }
    }, [E]);

    useEffect(() => {
        if (props.actionConfirmedMsg) {
            const timer = setTimeout(() => {
                props.setActionConfirmedMsg(false);
                // Also clear the API error message
                props.setApiError({ type: '', message: '' });
            }, 3000);
    
            return () => clearTimeout(timer);
        }
    }, [props.actionConfirmedMsg]);

    return (
        <div>
            <div style={{ textAlign: 'center'}}>
                <h2 style={{...mainStyle.title, fontSize: 'clamp(2.5rem, 1.1796rem + 5.6338vw, 6.25rem)', fontWeight: '300', color: 'white' }}>{T.h2_contact_form[language]}</h2>
                <hr style={{ height: '1px', width: '40%', borderColor: 'var(--clr-brand-blue)', marginInline: 'auto'}}/>
                <p style={{...mainStyle.paragraph, marginInline: 'auto'}}>{T.p_contact_form[language]}</p>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--clr-black)', margin: '0 auto', padding: '40px'}} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.callback(e);
                    }
                }}
            >
                {/* Spam trap: hidden from people, bots fill it in and the API ignores the message. */}
                <input type="text" name="website" value={F.website ?? ''} onChange={(e) => handleField(e)} tabIndex={-1} autoComplete="off" aria-hidden="true"
                    style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }} />
                <div style={contactStyles.formRow}>
                    <div style={contactStyles.formCol}>
                        <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.first_name ?? ''), borderColor: E.first_name ? 'red' : undefined }} type="text" name="first_name" value={F.first_name} placeholder={props.placeholderFirstName} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderFirstName('')} onBlur={() => F.first_name === '' && props.setPlaceholderFirstName(T.placeHolder_firstName[language])} required/>
                        <div style={{...contactStyles.errorDiv}}>{ E.first_name !== '' && (<p style={contactStyles.inputErrors}> {E.first_name} </p> )}</div>
                    </div>
                    <div style={contactStyles.formCol}>
                        <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.last_name ?? ''), borderColor: E.last_name ? 'red' : undefined }} type="text" name="last_name" value={F.last_name} placeholder={props.placeholderLastName} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderLastName('')} onBlur={() => F.last_name === '' && props.setPlaceholderLastName(T.placeHolder_lastName[language])} required/>
                        <div style={contactStyles.errorDiv}>{ E.last_name !== '' && (<p style={contactStyles.inputErrors}> {E.last_name} </p> )}</div>
                    </div>
                </div>
                <div style={contactStyles.formRow}>
                    <div style={contactStyles.formCol}>
                        <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.phone_number ?? ''), borderColor: E.phone_number ? 'red' : undefined }} type="text" name="phone_number" value={F.phone_number} placeholder={props.placeholderPhone} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderPhone('')} onBlur={() => F.phone_number === '' && props.setPlaceholderPhone(T.placeHolder_phone[language])} required/>
                        <div style={contactStyles.errorDiv}>{ E.phone_number !== '' && (<p style={contactStyles.inputErrors}> {E.phone_number} </p> )}</div>
                    </div>
                    <div style={contactStyles.formCol}>
                        <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.email?? ''), borderColor: E.email ? 'red' : undefined }} type="text" name="email" value={F.email} placeholder={props.placeholderEmail} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderEmail('')} onBlur={() => F.email === '' && props.setPlaceholderEmail(T.placeHolder_email[language])} required/>
                        <div style={contactStyles.errorDiv}>{ E.email !== '' && (<p style={contactStyles.inputErrors}> {E.email} </p> )}</div>
                    </div>
                </div>
                {isNotContactUs && (
                    <div>
                        <div style={contactStyles.formRow}>
                            <div style={contactStyles.formCol}>
                                <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.business_name ?? ''), borderColor: E.business_name ? 'red' : undefined }} type="text" name="business_name" value={F.business_name} placeholder={props.placeholderBusinessName} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderBusinessName('')} onBlur={() => F.business_name === '' && props.setPlaceholderBusinessName(T.placeHolder_business_name[language])} required/>
                                <div style={contactStyles.errorDiv}>{ E.business_name !== '' && (<p style={contactStyles.inputErrors}> {E.business_name} </p> )}</div>
                            </div>
                            <div style={contactStyles.formCol}>
                                <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.town?? ''), borderColor: E.town ? 'red' : undefined }} type="text" name="town" value={F.town} placeholder={props.placeholderTown} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderTown('')} onBlur={() => F.town === '' && props.setPlaceholderTown(T.placeHolder_town[language])} required/>
                                <div style={contactStyles.errorDiv}>{ E.town !== '' && (<p style={contactStyles.inputErrors}> {E.town} </p> )}</div>
                            </div>
                        </div>
                        <div style={contactStyles.formRow}>
                            <div style={contactStyles.formCol}>
                                <input className={styles.formInput} style={{...contactStyles.formInput, ...formStyles.input(E.province?? ''), borderColor: E.province ? 'red' : undefined }} type="text" name="province" value={F.province} placeholder={props.placeholderProvince} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderProvince('')} onBlur={() => F.province === '' && props.setPlaceholderProvince(T.placeHolder_province[language])} required/>
                                <div style={contactStyles.errorDiv}>{ E.province !== '' && (<p style={contactStyles.inputErrors}> {E.province} </p> )}</div>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <textarea style={{...contactStyles.formInput, ...formStyles.input(E.message ?? ''), borderColor: E.message ? 'red' : undefined}} name="message" value={F.message} placeholder={props.placeholderMessage} onChange={(e) => handleField(e)} onFocus={() => props.setPlaceholderMessage('')} onBlur={() => F.message === '' && props.setPlaceholderMessage(T.placeHolder_message[language])} required></textarea>
                    <div style={contactStyles.errorDiv}>{E.message !== '' && ( <p style={contactStyles.inputErrors}>{E.message}</p>)}</div>
                </div>
                <label className="ev-consent">
                    <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentError(false); }} />
                    <span>
                        {legal.consent.contactBefore[language]}
                        <Link to="/privacy">{legal.consent.policyLink[language]}</Link>.
                    </span>
                </label>
                {consentError && <p className="ev-consent__error" role="alert">{legal.consent.required[language]}</p>}
                <div>
                    <button type='button' style={{ ...contactStyles.formButton, opacity: props.isLoading ? 0.7 : 1, cursor: props.isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} 
                        onClick={(e) => { if (props.isLoading) return; if (!consent) { setConsentError(true); return; } props.callback(e); }} disabled={props.isLoading}>{props.isLoading && <ClipLoader size={20} color="white" />}{T.btn_send[language]}
                    </button>
                </div>
                {props.actionConfirmedMsg && 
                <div style={{...contactStyles.formRow, color: props.api_error.type === 'Success' ? 'green' : 'red', justifyContent: 'center'}}>
                    <p style={{ ...mainStyle.title, fontSize: '1.2rem'}}>{typeof props.api_error.message === 'string' ? props.api_error.message : props.api_error.message?.[language]}</p>
                </div>}
            </form>
        </div>
    )
};

export default ContactForm;
