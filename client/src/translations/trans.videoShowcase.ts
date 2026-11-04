

export const translations = {
	videoShowcase: {
		h1_videoShowcase: {
			en: "VIDEO SHOWCASE",
            fr: "VITRINE VIDÉO",
		},
		p_loading: {
			en: "Loading videos...",
			fr: "Chargement des vidéos...",
		},
		p_error: {
			en: "The videos could not be loaded. Please try again later.",
			fr: "Les vidéos n’ont pas pu être chargées. Veuillez réessayer plus tard.",
		},
	}
} as const;
  
type TranslationKeys = typeof translations.videoShowcase.h1_videoShowcase;
export type Language = keyof TranslationKeys;
