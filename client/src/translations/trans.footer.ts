export const translations = {
	footer: {
		p_thanks: {
            en: "We would like to warmly thank you for visiting our website. Please do not hesitate to contact us if you have any additional questions.",
            fr: "Nous tenons à vous remercier chaleureusement d'avoir visité notre site internet. N'hésitez pas à nous contacter si vous avez des questions supplémentaires.",
        },
        link_quick_links: {
            en: "Quick Links",
            fr: "Liens Rapides",
        },
        link_home: {
            en: "Home",
            fr: "Accueil",
        },
        link_our_series: {
            en: "Our Series",
            fr: "Nos Séries",
        },
        link_thor_series: {
            en: "Thor Series",
            fr: "Série Thor",
        },
        link_classic_series: {
            en: "Classic Series",
            fr: "Série Classic",
        },
        link_tora_series: {
            en: "Tora Series",
            fr: "Série Tora",
        },
        link_evolution_series: {
            en: "D-MAX Series",
            fr: "Série D-MAX",
        },
        link_luxor_series: {
            en: "Luxor Series",
            fr: "Série Luxor",
        },
        link_elite_series: {
            en: "Elite Series",
            fr: "Série Élite",
        },
        link_ressources: {
            en: "Resources",
            fr: "Ressources",
        },
        link_video_showcase: {
            en: "Video Showcase",
            fr: "Vitrine Vidéo",
        },
        link_contact_us: {
            en: "Contact Us",
            fr: "Contactez-Nous",
        },
		link_terms: {
            en: "Terms and Conditions",
            fr: "Termes et conditions",
        },
        link_contact: {
            en: "Contact Us",
            fr: "Contactez-Nous",
        },
		link_login: {
			en: "Login",
			fr: "Connexion",
		},
		copyrights:{
			en: "© 2024 Electrique Valley. All rights reserved.",
			fr: "© 2024 Electrique Valley. Tous droits réservés.",
		},
	}
} as const;
  
type TranslationKeys = typeof translations.footer.p_thanks;
export type Language = keyof TranslationKeys;
