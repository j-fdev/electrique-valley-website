

// Modules
import { useContext } from 'react';
import { Request, Response, NextFunction } from 'express';

// Interfaces
import { i_auth_login_fields, i_contact_form_data, i_user_creation } from './../interfaces/interfaces';

// Translations
import { translations } from '../translations/trans.validations';
import { LanguageContext } from '../translations/languageSelection';

const str_regex = /^[^\\/&\[\]{}<>]*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const T = translations.validations; 
// const languageContext = useContext(LanguageContext);
// const L = languageContext ? languageContext.language : 'en';

const sanitizeInput = (input: string ): boolean => {
	if (!str_regex.test(input)) {
		return false;
	}
	return true;
};

// \p{L} = any letter, accents included (é, è, ç...)
const lettersOnly = (input: string | number): boolean => {
    if (typeof input !== 'string' || !/^[\p{L}\s'.-]+$/u.test(input)) {
      return false;
    }
    return true;
};

const numbersOnly = (input: any): boolean => {
    return typeof input === "number" && Number.isFinite(input);
};
  
// const numbersAndDecimalsOnly = (input: any): boolean => {
//     return typeof input === "number" && Number.isFinite(input);
// };

const handleLoginFields = (form: i_auth_login_fields, language: 'en' | 'fr' = 'en'): [boolean, string, string] => { 
    console.log('in handleLoginFields', form );
  	if (form.email.trim() === '' &&  form.password.trim() === '') {
      return [ false , T.p_all_fields[language] , 'allFields'];
    }
    if (form.email.trim() === '') {
        return [ false , T.p_email[language] , 'email'];
    }
    if(form.password.trim() === ''){
        return [ false , T.p_password[language] , 'password'];
    }
    if (!emailPattern.test(form.email)) {
        return [ false , T.p_invalid_email[language] , 'email'];
    }
    if (form.password.length < 5) {
        return [ false , T.p_password_length[language] , 'password'];
    }

    return [true, '', ''];
};

const handleNewUserFields = (form: i_user_creation, language: 'en' | 'fr' = 'en'): [boolean, string, string] => { 
	
	const validFirstName = lettersOnly(form.first_name);
	const validlastName = lettersOnly(form.last_name);
	const validTypesKey = [0, 1]; 
	// const selectedType = form.type;
	
	if (form.email.trim() === '' || form.password.trim() === '' || form.first_name.trim() === '' || form.last_name.trim() === '' || String(form.type).trim() === '' || form.phoneNumber.trim() === '' || form.businessName.trim() === '' || form.city.trim() === '' || form.province.trim() === '' ) {
		return [false, T.p_all_fields[language], 'allFields'];
	}
	if (!validFirstName && form.first_name !== "") {
		return [false, T.p_invalid_characters[language], "firstname"];
	}
	if (!validlastName && form.last_name !== "") {
		return [false, T.p_invalid_characters[language], "lastname"];
	} 
	if (!emailPattern.test(form.email)) {
		return [false, T.p_invalid_email[language], 'email'];
	}
	if (form.password.length < 5) {
		return [false, T.p_password_length[language], 'password'];
	}
	if (!validTypesKey.includes(Number(form.type))) {
        return [false, T.p_invalid_selection[language], 'type'];
	}
	if (!numbersOnly(form.type) || !numbersOnly(form.timestamp)) {
		return [false, T.p_invalid_inputs[language], "type"];
	}
	if (!/^\+?[1-9]\d{1,14}$/.test(form.phoneNumber)) {
		return [false, T.p_invalid_phone[language], 'phoneNumber'];
	}

	// Validate that there's no forbidden characters in the inputs
    const fields: { field: keyof i_user_creation; name: string; language: string }[] = [
        { field: 'first_name', name: T.p_first_name[language], language },
        { field: 'last_name', name: T.p_last_name[language], language },
        { field: 'email', name: T.p_email_field[language], language },
        { field: 'password', name: T.p_password_field[language], language },
        { field: 'phoneNumber', name:  T.p_phone_number[language], language },
        { field: 'businessName', name: T.p_business_name[language], language },
        { field: 'city', name: T.p_city[language], language },
        { field: 'province', name: T.p_province[language], language }
      ];

	  for (let { field, name } of fields) {
		const isValid = sanitizeInput(String(form[field]));
		if (!isValid) {
            return [false, `${T.p_invalid_characters[language]} ${name}`, field];
		}
	  }

	return [true, '', ''];
};

const handleContactFields = (data: i_contact_form_data, source?: string, language: 'en' | 'fr' = 'en'): [boolean, string, string] => {
    const fields: { 
        field: keyof i_contact_form_data; 
        name: string;
        validator?: (value: string) => boolean;
    }[] = [
        { 
            field: 'first_name', 
            name: T.p_first_name[language],
            validator: lettersOnly
        },
        { 
            field: 'last_name', 
            name: T.p_last_name[language],
            validator: lettersOnly
        },
        { 
            field: 'email', 
            name: T.p_email_field[language],
            validator: (value) => emailPattern.test(value)
        },
        { 
            field: 'phone_number', 
            name: T.p_phone_number[language],
            validator: (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
        },
        { 
            field: 'message', 
            name: T.p_message[language]
        }
    ];

    if (source === 'becomeDealer' || source === 'findDealer') {
        fields.push(
            { field: 'business_name', name: T.p_business_name[language] },
            { field: 'town', name: T.p_city[language] },
            { field: 'province', name: T.p_province[language], validator: lettersOnly } 
        );
    }
    

    for (let { field, name, validator } of fields) {
        const value = data[field];
        
        if (!value?.trim()) {
            return [false, `${name} ${T.p_is_required[language]}`, field];
        }

        if (validator && !validator(value)) {
            return [false, `${T.p_invalid[language]} ${name.toLowerCase()} ${T.p_format[language]}`, field];
        }

        if (!sanitizeInput(String(value))) {
            return [false, `${T.p_invalid_characters_in[language]} ${name}`, String(field)];
        }
    }

    const sanitizePhoneNumber = (phone: string): string => {
        return phone.replace(/[^\d]/g, '');  
    };
    
    fields.push({ 
        field: 'phone_number', 
        name: 'Phone Number',
        validator: (value) => {
            const digitsOnly = sanitizePhoneNumber(value);
            return digitsOnly.length >= 10 && digitsOnly.length <= 15;
        }
    });

    return [true, '', ''];
};

const handleSubscribeFields = (email : string, language: 'en' | 'fr' = 'en'): [boolean, string, string] =>  {
    if (!email?.trim()) {
        return [false, T.p_email[language], 'email'];
    }

    if (!sanitizeInput(email)) {
        return [false, T.p_invalid_characters[language], 'email'];
    }

    if (!emailPattern.test(email)) {
        return [false, T.p_invalid_email[language], 'email'];
    }

    // Check maximum length to prevent database issues
    if (email.length > 255) {
        return [false, T.p_email_length[language], 'email'];
    }

    // Check for common email patterns that might be invalid
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
        return [false, T.p_invalid_email[language], 'email'];
    }
    return [true, '', ''];
}

// const validateSubscribe = (req: Request & { body: { email: string } }, res: Response, next: NextFunction): void => {
//     const { email } = req.body;
//     const [isValid, error, field] = handleSubscribeFields(email);
//     if (!isValid) {
//         res.status(400).json({ type: 'Failed', message: error, data : field });
//         return;
//     }
//     next();
// }

export { handleLoginFields, handleNewUserFields, sanitizeInput, lettersOnly, handleContactFields, handleSubscribeFields };