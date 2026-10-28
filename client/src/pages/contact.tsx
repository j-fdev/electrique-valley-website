// Modules
import { useContext, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
            {/* Contact section */}
            <div style={contactStyle.contactSection}>
                <div style={ contactStyle.contactContainer }>                                    
                    <div>
                        <h1 style={{...mainStyle.title, ...contactStyle.contactH1}}>{T.h1_contact[L]}</h1>
                        <hr style={mainStyle.hrStyle}/>
                        <p style={mainStyle.paragraph}>{T.p_more_info[L]}</p>
                    </div>
                
                    <div style={{ ...contactStyle.contactTextContent }}>                                 
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', columnGap: isMobile ? '0' : '20px' }}>
                            <div style={{ marginRight: '15px' }}>
                                <svg style={{ ...contactStyle.contactIcons}} xmlns="http://www.w3.org/2000/svg" id="f7651d76-ee00-4083-9c64-2796abaebea1" data-name="Layer 1" viewBox="0 0 45 34.6149">
                                    <path d="M1,.7692V35.3841H46V.7692Zm43.06.9575L23.5,16.3357,2.9391,1.7267Zm-42.1029,32.7V2.2038L23.5,17.51,45.0425,2.2042V34.4266Z" transform="translate(-1 -0.7692)"></path>
                                    <rect x="4.6152" y="24.3289" width="10.9615" height="0.9575"></rect><rect x="4.6152" y="28.3672" width="5.7695" height="0.9574"></rect>
                                </svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: 'clamp(1.188rem, 0.9901rem + 0.8443vw, 1.75rem)'}}>{T.h3_contact_info[L]}</h3><br />
                                <p style={{...mainStyle.paragraph, margin: '0'}}>450 747-1525</p>
                                <p style={{...mainStyle.paragraph, margin: '0'}}>electriquevalley@hotmail.com</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', columnGap: isMobile ? '0' : '20px'}}>
                            <div style={{ marginRight: '15px' }}>
                                <svg style={{ ...contactStyle.contactIcons}} xmlns="http://www.w3.org/2000/svg" id="f4c81fb4-425f-4ac6-9e17-c0fe23bc1ab5" data-name="Layer 1" viewBox="0 0 28.8462 45">
                                    <path d="M22.7115,32.9362a90.8161,90.8161,0,0,0,4.96-9.147c1.4982-3.2848,2.2519-5.8716,2.2519-7.6861a14.4231,14.4231,0,0,0-28.8462,0c0,1.8145.7537,4.4013,2.2519,7.6861a90.8161,90.8161,0,0,0,4.96,9.147c1.861,3.0614,3.722,5.853,4.96,7.6489.093.14.1861.27.27.4a17.4648,17.4648,0,0,0-4.1408.7724,6.3447,6.3447,0,0,0-1.8518.9118,1.2729,1.2729,0,0,0,0,2.2519,6.1185,6.1185,0,0,0,1.8518.9119A20.0544,20.0544,0,0,0,15.5,46.68a20.0544,20.0544,0,0,0,6.1228-.8468,6.1185,6.1185,0,0,0,1.8518-.9119,1.2729,1.2729,0,0,0,0-2.2519,6.3447,6.3447,0,0,0-1.8518-.9118,17.5478,17.5478,0,0,0-4.15-.7724c.093-.13.1861-.2605.2791-.4C18.99,38.7892,20.8505,35.9976,22.7115,32.9362Zm-1.3864,9.7054a5.2549,5.2549,0,0,1,1.5726.763c.27.2047.3256.3535.3256.3908s-.0558.1861-.3256.3908a5.3739,5.3739,0,0,1-1.5726.763,18.9786,18.9786,0,0,1-5.8251.8,18.9786,18.9786,0,0,1-5.8251-.8,5.3739,5.3739,0,0,1-1.5726-.763c-.27-.2047-.3256-.3536-.3256-.3908s.0558-.1861.3256-.3908a5.2549,5.2549,0,0,1,1.5726-.763,17.46,17.46,0,0,1,4.4665-.7631c.2792.4095.53.7631.7352,1.0515l.6234.8654.6234-.8654c.2048-.2884.4467-.642.7352-1.0515A17.46,17.46,0,0,1,21.3251,42.6416ZM16.9888,40.064c-.2047.3071-.4094.5862-.5955.8561-.2326.3443-.456.6513-.6514.9212-.0837.13-.1674.2419-.2419.3536-.0745-.1117-.1582-.2233-.2419-.3536-.1954-.27-.4188-.5769-.6514-.9212-.1861-.27-.3908-.549-.5955-.8561-1.2283-1.7959-3.08-4.5688-4.9318-7.6117a90.6281,90.6281,0,0,1-4.9038-9.0447c-1.4423-3.1637-2.1682-5.62-2.1682-7.3045a13.4926,13.4926,0,1,1,26.9852,0c0,1.6842-.7259,4.1408-2.1682,7.3045a89.7474,89.7474,0,0,1-4.9038,9.0447C20.0688,35.4952,18.2171,38.2681,16.9888,40.064Z" transform="translate(-1.0769 -1.68)"></path><path d="M15.5,8.6031a5.7693,5.7693,0,1,0,5.7692,5.7692A5.7741,5.7741,0,0,0,15.5,8.6031Zm0,10.6079a4.8387,4.8387,0,1,1,4.8387-4.8387A4.8409,4.8409,0,0,1,15.5,19.211Z" transform="translate(-1.0769 -1.68)"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 style={{ fontSize: 'clamp(1.188rem, 0.9901rem + 0.8443vw, 1.75rem)'}}>{T.h3_adress[L]}</h3><br />
                                <p style={{...mainStyle.paragraph, margin: '0'}}>Salaberry-de-Valleyfield, QC</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={contactStyle.contactImgContainer}>
                    <img src={headerImage} alt="Contact" style={contactStyle.contactImg} />
                </div>
            </div>                                                                                                                                                                                                           
            <div style={{ ...contactStyle.contactFormSection }}>
                <ContactForm {...contact_form_props} isLoading={isLoading} setIsLoading={setIsLoading}/>
            </div>
            <hr />
        </>
    );
};

export default Contact;
