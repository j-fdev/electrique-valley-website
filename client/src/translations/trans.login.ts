export const translations = {
    login: {
        h2_hero: {
            en: "LOGIN",
            fr: "CONNEXION",
        },
        placeHolder_email: {
            en: "Email",
            fr: "Courriel",
        },
        placeHolder_password: {
            en: "Password",
            fr: "Mot de passe",
        },
    }
} as const;

type TranslationKeys = typeof translations.login.h2_hero;
export type Language = keyof TranslationKeys;
