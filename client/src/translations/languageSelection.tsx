import { createContext, useState, useEffect, ReactNode } from "react";
import { Language } from "./trans.login";

// Define the shape of our context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const getBrowserLanguage = (): Language => {
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage) {
            return savedLanguage;
        }
        const lang = navigator.language === "fr-CA" ? "fr" :
                     navigator.language.startsWith("fr") ? "fr" :
                     navigator.language.startsWith("en") ? "en" : "fr"; // Check for any English variations (e.g., en-US, en-GB)
        return lang;
    };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  useEffect(() => {
    localStorage.setItem("language", language); // Save preference
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
