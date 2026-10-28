

export const translations = {
	videoShowcase: {
		h1_videoShowcase: {
			en: "VIDEO SHOWCASE",
            fr: "VITRINE VIDÉO",
		},
	}
} as const;
  
type TranslationKeys = typeof translations.videoShowcase.h1_videoShowcase;
export type Language = keyof TranslationKeys;
