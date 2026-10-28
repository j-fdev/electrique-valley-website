export const translations = {
	navbar: {
		home: {
			en: "HOME",
			fr: "ACCUEIL",
		},
		our_series: {
			en: "OUR SERIES",
			fr: "NOS SÉRIES",
		},
		diablo_serie: {
			en: "DIABLO SERIE",
			fr: "SÉRIE DIABLO",
		},
		thor_serie: {
			en: "THOR SERIE",	
			fr: "SÉRIE THOR",
		},
		classic_serie: {	
			en: "CLASSIC SERIE",
			fr: "SÉRIE CLASSIC",
		},
		tora_serie: {	
			en: "TORA SERIE",
			fr: "SÉRIE TORA",
		},
		dMax_serie: {
			en: "EVOLUTION SERIE",
			fr: "SÉRIE ÉVOLUTION",
		},
		luxor_serie: {
			en: "LUXOR SERIE",
			fr: "SÉRIE LUXOR",
		},
		elite_serie: {
			en: "ELITE SERIE",
			fr: "SÉRIE ÉLITE",
		},
		ressources: {
			en: "RESSOURCES",
			fr: "RESSOURCES",
		},
		video_showcase: {
			en: "VIDEO SHOWCASE",
			fr: "VITRINE VIDÉO",
		},
		contact_us: {
			en: "CONTACT US",
			fr: "CONTACTEZ-NOUS",
		},
		login: {
			en: "LOGIN",
			fr: "CONNEXION",
		},
  		logout: {
			en: "LOGOUT",
			fr: "DÉCONNEXION",
		},
  	}
} as const;
  
type TranslationKeys = typeof translations.navbar.home;
export type Language = keyof TranslationKeys;
