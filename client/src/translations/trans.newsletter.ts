

import NewsletterModal from "../components/modal/newsletter.modal";

export const translations = {
	NewsletterModal: {
        p_dont_miss: {
            en: "Don't miss any opportunity",
            fr: "Ne manquez aucune opportunité",
        },
        p_be_first: {   
            en: "Be the first to know when we have new things",
            fr: "Soyez le premier à savoir quand nous avons des nouveautés",
        },
        p_thank_you: {
            en: "Thank you for subscribing to our newsletter!",
            fr: "Merci de vous être abonné à notre infolettre!",
        },
        p_btn_subscribe: {
            en: "Subscribe",
            fr: "S'abonner",
        },
        p_appriciate: {
            en: "We appreciate your privacy. We will never send you spam or share your information with third parties.",
            fr: "Nous apprécions votre vie privée. Nous ne vous enverrons jamais de spam ni ne transmettrons votre informations à des tiers.",
        },
        p_email_placeholder: {
            en: "Enter your email address",
            fr: "Entrez votre adresse courriel",
        },
        p_enter_email: {
            en: "Please enter your email address",
            fr: "Veuillez entrer votre adresse courriel",
        },
        p_email_error: {
            en: "Please enter a valid email address",
            fr: "Veuillez entrer une adresse courriel valide",
        },
   
    },
};                                                      

type TranslationKeys = typeof translations.NewsletterModal.p_dont_miss;
export type Language = keyof TranslationKeys;
