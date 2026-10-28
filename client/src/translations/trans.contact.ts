export const translations = {
	contact: {
		h1_contact: {
			en: "CONTACT",
			fr: "CONTACT",
		},
        p_more_info: {
            en: "For more information on our products, feel free to contact us.",    
            fr: "Pour plus d'informations sur nos produits, n'hésitez pas à nous contacter.",
        },
        h3_contact_info: {
            en: "Contact info",
            fr: "Coordonnées",
        },
        h3_adress: {
            en: "Address",
            fr: "Adresse",
        },
        h2_contact_form: {
            en: "EMAIL US",
            fr: "ÉCRIVEZ-NOUS",
        },
        p_contact_form: {
            en: "We value your privacy. We will never spam you or pass your information on to third parties.",
            fr: "Nous apprécions votre vie privée. Nous ne vous enverrons jamais de spam ni ne transmettrons votre informations à des tiers.",
        },
        placeHolder_firstName: {
            en: "First Name*",
            fr: "Prénom*",
        },
        placeHolder_lastName: {
            en: "Last Name*",
            fr: "Nom*",
        },
        placeHolder_phone: {
            en: "Phone Number*",
            fr: "Numéro de téléphone*",
        },
        placeHolder_email: {
            en: "Email*",
            fr: "Courriel*",
        },
        placeHolder_business_name: {
            en: "Business Name",
            fr: "Nom de l'entreprise",
        },
        placeHolder_town: {
            en: "Town",
            fr: "Ville",
        },
        placeHolder_province: {
            en: "Province",
            fr: "Province",
        },
        placeHolder_message: {
            en: "Message*",
            fr: "Message*",
        },
        btn_send: {
            en: "SEND",
            fr: "ENVOYER",
        },
	}
} as const;
  
type TranslationKeys = typeof translations.contact.h1_contact;
export type Language = keyof TranslationKeys;
