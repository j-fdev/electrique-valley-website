import { createContext, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Language } from "./trans.login";
import { findPage, languageOfPath, pathFor } from "../config/routes";

// Define the shape of our context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The language comes from the address: English pages are under /en, French pages at the root.
 * Each language has its own address so Google can index both (it browses in English, so the
 * old "follow the browser language" choice hid the French pages from it).
 * Must sit inside the router, because it reads and changes the address.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const language = languageOfPath(pathname);

  // Switching language opens the same page in the other language (same ?query, e.g. the unsubscribe link)
  const setLanguage = (lang: Language) => {
    const current = findPage(pathname);
    const target = pathFor(current ? current.page : 'home', lang);
    navigate(target + search + hash);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
