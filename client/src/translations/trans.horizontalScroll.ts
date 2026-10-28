

export const translations = {
	horizontalScroll: {
		btn_learn_more: {
			en: "LEARN MORE",
            fr: "EN SAVOIR PLUS",
		}
	}
} as const;
  
type TranslationKeys = typeof translations.horizontalScroll.btn_learn_more;
export type Language = keyof TranslationKeys;
