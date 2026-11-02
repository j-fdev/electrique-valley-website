// Modules
import { useContext, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import version from '../config/version';

// Config
import { apiCall } from '../config/api.config';

// Components
import ContactForm from '../components/form/contact.form';

// Hooks
import { useWindowSize } from '../hooks/useWindowSize';

// Middlewares
import { handleContactFields } from '../middlewares/validation.middleware';

// Styles
import HomeStyles from '../styles/home.style';
import MainStyle from '../styles/main.styles';
import ContactStyle from '../styles/contact.style';

// Translations
import { translations } from '../translations/trans.contact';
import { LanguageContext } from '../translations/languageSelection';
import { i_contact_form_props } from '../interfaces/interfaces';

interface FormData {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    message: string;
    business_name: string;
    town: string;
    province: string;
    emailSubject: string;
    website?: string;
}

const Contact = () => {
    const isMobile = useWindowSize();
    const mainStyle = MainStyle();
    const contactStyle = ContactStyle();
	const T = translations.contact; 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source') ?? undefined;
  
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const firstNameLanguage = T.placeHolder_firstName[L];
    const lastNameLanguage = T.placeHolder_lastName[L];
    const phoneLanguage = T.placeHolder_phone[L];
    const emailLanguage = T.placeHolder_email[L];
    const messageLanguage = T.placeHolder_message[L];
    const businessNameLanguage = T.placeHolder_business_name[L];
    const townLanguage = T.placeHolder_town[L];
    const provinceLanguage = T.placeHolder_province[L];

    const defaultFields: FormData = { first_name: '', last_name: '', phone_number: '', email: '', message: '', business_name: '', town: '', province: '', emailSubject: 'Contact Request', website: '' };
    const default_error = { type : 'Success' , message: ""}

    const [ form , setForm ] = useState<FormData> (defaultFields);
    const [headerImage, setHeaderImage] = useState(`/img/contact/Luxor-4-red-cart-scaled.jpg?v=${version}`);
    // const [ first_name, setFirst_name ] = useState('');
    // const [ last_name, setLast_name ] = useState('');
    // const [ phone_number, setPhone_number ] = useState('');
    // const [ email, setEmail ] = useState('');
    // const [ message, setMessage ] = useState('');
    // const [ business_name, setBusiness_name ] = useState('');
    // const [ town, setTown ] = useState('');
    // const [ province, setProvince ] = useState('');
    const [ emailSubject, setEmailSubject ] = useState('Contact Request');
    const [placeholderFirstName, setPlaceholderFirstName] = useState<string>(firstNameLanguage);
    const [placeholderLastName, setPlaceholderLastName] = useState<string>(lastNameLanguage);
    const [placeholderPhone, setPlaceholderPhone] = useState<string>(phoneLanguage);
    const [placeholderEmail, setPlaceholderEmail] = useState<string>(emailLanguage);
    const [placeholderMessage, setPlaceholderMessage] = useState<string>(messageLanguage);
    const [placeholderBusinessName, setPlaceholderBusinessName] = useState<string>(businessNameLanguage);
    const [placeholderTown, setPlaceholderTown] = useState<string>(townLanguage);
    const [placeholderProvince, setPlaceholderProvince] = useState<string>(provinceLanguage);
    const [isLoading, setIsLoading] = useState(false);
    const [ actionConfirmedMsg, setActionConfirmedMsg] = useState(false);
    const [error, setError] = useState({});
    const clearErrors = () => { setError(defaultFields); };
    const [ api_error , setApiError ] = useState(default_error);

    useEffect(() => {
        if (source === 'becomeDealer') {
            setHeaderImage(`/img/contact/two-business-men-shaking-hands.jpg?v=${version}`);
            setEmailSubject('Become a Dealer Inquiry');
        } else if (source === 'findDealer') {
            setHeaderImage(`/img/contact/6398897_110.jpg?v=${version}`);
            setEmailSubject('Find a Dealer Inquiry');
        }
    }, [source]);

    const data = { ...form, emailSubject };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const [ isValid , msg , field ] = handleContactFields(data, source, L);

            if (!isValid) {
                setError({ [field]: msg });
                setTimeout(() => {
                    setError({});
                    setForm(defaultFields);
                }, 3000);
                return;
            }

            setIsLoading(true);
            const response = await apiCall("/api/email/send-email", {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                    language: L
                }),
            });

            if (response.type === 'Success') {
                setActionConfirmedMsg(true)
                setApiError({ type: response.type, message: response.message[L] });
                setForm(defaultFields);
            } else {
                // console.error("Error sending email");
                setApiError({ type: response.type, message: response.message[L] });
                setActionConfirmedMsg(true);
            }
        } catch (error) {
            setApiError({ type: 'Error', message: error.message[L] || 'Network error occurred' });
            console.log("Network error:", error)
            setActionConfirmedMsg(true);
        }finally {
            setIsLoading(false);
        }
      };
    

      const contact_form_props = { 
        form, setForm, placeholderFirstName, setPlaceholderFirstName, placeholderLastName, 
        setPlaceholderLastName, placeholderPhone, setPlaceholderPhone, placeholderEmail, setPlaceholderEmail, placeholderBusinessName, setPlaceholderBusinessName, placeholderTown, setPlaceholderTown, placeholderProvince, setPlaceholderProvince, placeholderMessage, setPlaceholderMessage,
        callback: handleSubmit, error, setError, clearErrors, actionConfirmedMsg, setActionConfirmedMsg, api_error, setApiError 
    };

    return (
        <>
            <section className="ev-page-hero">
                <div className="ev-container">
                    <h1>{T.h1_contact[L]}</h1>
                    <p>{T.p_more_info[L]}</p>
                </div>
            </section>

            <section className="ev-section">
                <div className="ev-container">
                    <div className="ev-contact-grid">
                        <div className="ev-contact-cards ev-stagger">
                            <div className="ev-contact-card">
                                <div className="ev-contact-card__icon"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></div>
                                <div>
                                    <h3>{T.h3_contact_info[L]}</h3>
                                    <p><a href="tel:+14507471525" style={{ color: 'inherit' }}>450 747-1525</a></p>
                                    <p><a href="mailto:electriquevalley@hotmail.com" style={{ color: 'inherit' }}>electriquevalley@hotmail.com</a></p>
                                </div>
                            </div>
                            <div className="ev-contact-card">
                                <div className="ev-contact-card__icon"><svg viewBox="0 0 384 512" aria-hidden="true"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg></div>
                                <div>
                                    <h3>{T.h3_adress[L]}</h3>
                                    <p>Salaberry-de-Valleyfield, QC</p>
                                </div>
                            </div>
                        </div>
                        <img className="ev-contact-photo ev-reveal ev-reveal--right" src={headerImage} alt="" />
                    </div>

                    <div className="ev-form-wrap ev-reveal">
                        <ContactForm {...contact_form_props} isLoading={isLoading} setIsLoading={setIsLoading}/>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
