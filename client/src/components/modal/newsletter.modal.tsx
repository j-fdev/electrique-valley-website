// Modules
import { useState, useContext } from 'react';
import { API_BASE_URL } from '../../config/api.config';
import { legal } from '../../translations/trans.legal';

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Middlewares
import { handleSubscribeFields } from '../../middlewares/validation.middleware';

// Styles
import NewsletterStyles from '../../styles/newsletter.style';
import ContactStyle from '../../styles/contact.style';
import MainStyles from '../../styles/main.styles';

// Translations
import { translations } from '../../translations/trans.newsletter';
import { LanguageContext } from '../../translations/languageSelection';
import { ClipLoader } from 'react-spinners';

interface i_newsletter_modal_props {
    email: string;
    emailError: string;
    isEmailValid: boolean;
    isEmailSubmitted: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewsletterModal: React.FC<i_newsletter_modal_props> = (props) => {

    const isMobile = useWindowSize();
    const newsletterStyles = NewsletterStyles();
    const contactStyles = ContactStyle();
    const mainStyle = MainStyles();
    const T = translations.NewsletterModal; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const default_error = { type : 'Success' , message: ""}

    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState(""); // spam trap
    const [consent, setConsent] = useState(false);          // Law 25: separate, unchecked box
    const [consentError, setConsentError] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ actionConfirmedMsg, setActionConfirmedMsg] = useState(false);
    const [error, setError] = useState<{ email?: string; type?: string; message?: string }>({});
    const [ api_error , setApiError ] = useState(default_error);
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError("");
        setIsEmailSubmitted(false);
    };
    
    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!consent) {
            setConsentError(true);
            return;
        }
        try {
            const [ isValid , msg , field ] = handleSubscribeFields(email, L);

            if (!isValid) {
                setError({ [field]: msg });
                setTimeout(() => {
                    setError({});
                    setEmail('');
                }, 3000);
                return;
            }

            setIsLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/email/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: email,
                    website: website,
                    language: L 
                }),
                credentials: 'include'
            });
            
            const res = await response.json();

            if (res.type === 'Success') {
                setActionConfirmedMsg(true)
                setApiError({ type: res.type, message: res.message[L] });
                setEmail('');
            }  else {
                // console.error("Error sending email");
                setApiError({ type: res.type, message: res.message[L] });
                setActionConfirmedMsg(true);
                setTimeout(() => {
                    setApiError(default_error);
                    setActionConfirmedMsg(false);
                    setEmail('');
                }, 3000);
            }
        } catch (error) {
            setError({ type: 'Error', message: error.message[L] || 'Network error occurred' });
            console.log("Network error:", error)
            setActionConfirmedMsg(true);
        }finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div style={{...newsletterStyles.newsletterContainer, gap: '0'}}>
            <div style={{ 
                position: 'relative',  
                width: isMobile ? '340px' : '860px', 
                minHeight: '400px', 
                backgroundColor: 'black', 
                padding: '2rem', 
                borderRadius: '2px',
                boxSizing: 'border-box'
            }}>
                    <form style={newsletterStyles.newsletterForm} noValidate onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); !isLoading && handleEmailSubmit(e as unknown as React.FormEvent<HTMLFormElement>); } }}>
                    <h3 style={{ fontSize: isMobile ? '1rem' : '1.5rem', marginTop: '2rem', color: 'white'}}>{T.p_dont_miss[L]}</h3>
                    <p style={{ fontSize: isMobile ? '.750rem' :'.9375rem'}}>{T.p_be_first[L]}</p>
                    {/* Spam trap: hidden from people, bots fill it in and the API ignores the message. */}
                    <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true"
                        style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }} />
                    <input style={{...newsletterStyles.newsletterInput, borderColor: error.email ? 'red' : undefined }} type="text" placeholder={T.p_email_placeholder[L]} value={email} onChange={handleEmailChange} />
                    <label className="ev-consent ev-consent--compact">
                        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setConsentError(false); }} />
                        <span>{legal.consent.newsletter[L]}</span>
                    </label>
                    {consentError && <p className="ev-consent__error" role="alert">{legal.consent.required[L]}</p>}
                    <div style={{minHeight: '25px'}}>
                        {actionConfirmedMsg ? (
                            <div style={{...contactStyles.formRow, color: api_error.type === 'Success' ? 'green' : 'red', justifyContent: 'center'}}>
                                <p style={{textAlign: 'center', fontSize: '1rem'}}>{typeof api_error.message === 'string' ? api_error.message : api_error.message?.[L]}</p>
                            </div>
                        ) : (
                            <div style={{...contactStyles.errorDiv, textAlign: 'center', fontSize: '14px'}}>
                                {typeof error.email === 'string' ? error.email : error.email?.[L]}
                            </div>
                        )}
                    </div>
                    <button type='button' style={{ ...newsletterStyles.newsletterButton, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} 
                        onClick={(e) => !isLoading && handleEmailSubmit(e as unknown as React.FormEvent<HTMLFormElement>)} disabled={isLoading}>{isLoading && <ClipLoader size={20} color="white" />}{T.p_btn_subscribe[L]}
                    </button>
                    <button type="button" style={newsletterStyles.newsletterButtonClose} onClick={() => props.setIsOpen(false)}><svg style={{ fill: 'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm175 79c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg></button>
                    <p style={{ fontSize: '.8125rem'}}>{T.p_appriciate[L]}</p>
                </form>
            </div>
        </div>
    );
};

export default NewsletterModal;
