

export const translations = {
	validations: {
		p_all_fields: {
            en: "All fields are required",
            fr: "Tous les champs sont requis",
        },
        p_email: {
            en: "Email is required",
            fr: "L'email est requis",
        },
        p_password: {
            en: "Password is required",
            fr: "Le mot de passe est requis",
        },
        p_invalid_email: {
            en: "Invalid email format",
            fr: "Format de courriel invalide",
        },
        p_password_length: {
            en: "Password length must be at least 5 characters long",
            fr: "La longueur du mot de passe doit comporter au moins 5 caractères",
        },
        p_email_length: {
            en: "Email is too long",
            fr: "L'email est trop long",
        },
        p_invalid_characters: {
            en: "Invalid characters",
            fr: "Caractères invalides",
        },
        p_invalid_selection: {
            en: "Invalid selection",
            fr: "Sélection invalide",
        },
        p_invalid_phone: {
            en: "Invalid phone number",
            fr: "Numéro de téléphone invalide",
        },
        p_invalid_inputs: {
            en: "Invalid input: numbers only.",
            fr: "Entrée invalide : uniquement des chiffres.",
        },
        p_Invalid_characters_in: {
            en: "Invalid characters in",
            fr: "Caractères invalides dans",
        },
        p_first_name: {
            en: "First Name",
            fr: "Prénom",
        },
        p_last_name: {
            en: "Last Name",
            fr: "Nom de famille",
        },
        p_email_field: {
            en: "Email",
            fr: "Courriel",
        },
        p_password_field: {
            en: "Password",
            fr: "Mot de passe",
        },
        p_phone_number: {
            en: "Phone Number",
            fr: "Numéro de téléphone",
        },
        p_message: {
            en: "Message",
            fr: "Message",
        },
        p_business_name: {
            en: "Business Name",
            fr: "Nom de l'entreprise",
        },
        p_city: {   
            en: "City",
            fr: "Ville",
        },
        p_province: {
            en: "Province",
            fr: "Province",
        },
        p_is_required: {
            en: "is required",
            fr: "est requis",
        },
        p_invalid_characters_in: {
            en: "Invalid characters in",
            fr: "Caractères invalides dans",
        },
        p_invalid: {
            en: "Invalid",
            fr: "Format",
        },
        p_format: {
            en: "format",
            fr: "invalide",
        },
	}
} as const;
  
type TranslationKeys = typeof translations.validations.p_all_fields;
export type Language = keyof TranslationKeys;
