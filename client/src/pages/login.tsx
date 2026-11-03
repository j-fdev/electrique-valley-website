// // Modules
// import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Components
// import LoginForm from '../components/form/login.form';

// // Middlewares
// import { handleLoginFields } from './../middlewares/validation.middleware';

// // Hooks
// import { useWindowSize } from '../hooks/useWindowSize';

// // Styles
// import formStyles from "../styles/loginForm.styles";
// import MainStyles from "../styles/main.styles";

// // Utilities
// import { GlobalMessage } from '../utils/globalMessage';

// // Translations
// import { translations } from '../translations/trans.login';
// import { LanguageContext } from '../translations/languageSelection';

// const Login = () => { 
//     const isMobile = useWindowSize();
//     const nav = useNavigate();
//     const mainStyles = MainStyles();

//     const T = translations.login; 

//     const languageContext = useContext(LanguageContext);
//     const L = languageContext ? languageContext.language : 'en';
//     const emailLanguage = T.placeHolder_email[L];
//     const passwordLanguage = T.placeHolder_password[L];

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [allFields, setAllFields] = useState('');
//     const [placeholderEmail, setPlaceholderEmail] = useState<string>(emailLanguage);
//     const [placeholderPword, setPlaceholderPword] = useState<string>(passwordLanguage);
//     const [error, setError] = useState<{ email?: string; password?: string; allFields?: string }>({});

//     const { message, setMessage } = GlobalMessage();

//     const clearErrors = () => { setError({}); };

//     const redirect = () => { nav('/dashboard'); };

//     const handleSubmit = async () => {
//         const data = { email: email, password: password };
//         try {
//             const response = await fetch('https://api.electriquevalley.com/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data),
//                 credentials: 'include'
//             });
    
//             const result = await response.json();
//             const [ valid , msg , field ] = handleLoginFields(data);
//             if(valid) {
//                 if (result.type === 'Success') {
//                         // props.setAuth(true);
//                         redirect();
//                     } else {
//                         setMessage(result.message || 'Login failed');
//                         console.log('login msg error', result.message)
//                     }   
//                 } else {  
//                         if(field === 'password')setError({ ...error , password : msg})
//                         if(field === 'email')setError({ ...error , email : msg})
//                         if(field === 'allFields')setError({ ...error , allFields : msg})
//                 }
//         }   catch (error) {
//             console.error('Error during form submission:', error);
//             setError({ allFields: 'An error occurred. Please try again.' });
//         }  
//     };

//     const login_form_props = { email, setEmail, password, setPassword, placeholderEmail, setPlaceholderEmail, placeholderPword, setPlaceholderPword, error, setError,
//         clearErrors, callback: handleSubmit
//     };
       
//     return (
//         <div style={formStyles.header}>
//             {message && <div style={mainStyles.messageStyle}>{message}</div>}
            
//             {isMobile ? (
//                 <div style={formStyles.mobileCenteredForm}><LoginForm {...login_form_props} /></div>
//             ) : (
//                 <>
//                     <div style={formStyles.leftSide}>
//                         <div>
//                             <div style={{ textAlign: 'center' }}>
//                                 <LoginForm {...login_form_props} />
//                             </div>
//                         </div>
//                     </div>
//                     <div style={formStyles.rightSide}>
//                         <div style={formStyles.overlay}></div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Login;
export {};
