

import { NextFunction, Request, Response } from 'express';
import { i_contact_form_data } from './../interfaces/interfaces';

const str_regex = /^[^\\/&\[\]{}<>]*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeInput = (input: string ): boolean => {
	if (!str_regex.test(input)) {
		return false;
	}
	return true;
};

const lettersOnly = (input: string | number): boolean => {
    // \p{L} = any letter, including accents (é, è, ç, ...).
    if (typeof input !== 'string' || !/^[\p{L}\s'.-]+$/u.test(input)) {
      return false;
    }
    return true;
};

const handleContactFields = (data: i_contact_form_data, source?: string): [boolean, string, string] => {
    const fields: { 
        field: keyof i_contact_form_data; 
        name: string;
        validator?: (value: string) => boolean;
    }[] = [
        { 
            field: 'first_name', 
            name: 'First Name',
            validator: lettersOnly
        },
        { 
            field: 'last_name', 
            name: 'Last Name',
            validator: lettersOnly
        },
        { 
            field: 'email', 
            name: 'Email',
            validator: (value) => emailPattern.test(value)
        },
        { 
            field: 'phone_number', 
            name: 'Phone Number',
            validator: (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
        },
        { 
            field: 'message', 
            name: 'Message'
        }
    ];

    if (source === 'becomeDealer' || source === 'findDealer') {
        fields.push(
            { field: 'business_name', name: 'Business Name' },
            { field: 'town', name: 'Town' },
            { field: 'province', name: 'Province', validator: lettersOnly } 
        );
    }
    

    for (let { field, name, validator } of fields) {
        const value = data[field];
        
        if (!value?.trim()) {
            return [false, `${name} is required`, field];
        }

        if (validator && !validator(value)) {
            return [false, `Invalid ${name.toLowerCase()} format`, field];
        }

        if (!sanitizeInput(String(value))) {
            return [false, `Invalid characters in ${name}`, String(field)];
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

const validateContact = (req: Request & { body: i_contact_form_data }, res: Response, next: NextFunction): void => {
    
    const data = req.body;
    const emailSubject = data.emailSubject || '';
    const source = emailSubject === 'Become a Dealer Inquiry' || emailSubject === 'Find a Dealer Inquiry' ? 'becomeDealer' : 'contactForm';
    
    const [isValid, error, field] = handleContactFields(data, source);
    
    if (!isValid) {
        res.status(400).json({ type : 'Failed' , message : error , data : field });
        return;
    }
    
    next();
};

const handleSubscribeFields = (email: string): [boolean, string, string]  => {
    if (!email?.trim()) {
        return [false, 'Email is required', 'email'];
    }

    if (!sanitizeInput(email)) {
        return [false, 'Invalid characters in email', 'email'];
    }

    if (!emailPattern.test(email)) {
        return [false, 'Invalid email format', 'email'];
    }

    // Check maximum length to prevent database issues
    if (email.length > 255) {
        return [false, 'Email is too long', 'email'];
    }

    // Check for common email patterns that might be invalid
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
        return [false, 'Invalid email format', 'email'];
    }
    return [true, '', ''];
}

const validateSubscribe = (req: Request & { body: { email: string } }, res: Response, next: NextFunction): void => {
    const { email } = req.body;
    const [isValid, error, field] = handleSubscribeFields(email);
    if (!isValid) {
        res.status(400).json({ type: 'Failed', message: error, data : field });
        return;
    }
    next();
}

export { sanitizeInput, lettersOnly, handleContactFields, handleSubscribeFields, validateContact, validateSubscribe };