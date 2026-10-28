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
            console.log("Using saved language:", savedLanguage);
            return savedLanguage;
        }
        console.log("navigator.language:", navigator.language);
        const lang = navigator.language === "fr-CA" ? "fr" :
                     navigator.language.startsWith("fr") ? "fr" :
                     navigator.language.startsWith("en") ? "en" : "en"; // Check for any English variations (e.g., en-US, en-GB)
        console.log("Detected browser language:", navigator.language, "Using language:", lang);
        return lang;
    };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const updateLanguage = (lang: Language) => {
    console.log("Updating language to:", lang);
    setLanguage(lang);
  };

  useEffect(() => {
    console.log("Setting language in localStorage:", language);
    localStorage.setItem("language", language); // Save preference
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
