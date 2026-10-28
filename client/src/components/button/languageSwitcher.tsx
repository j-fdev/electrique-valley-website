import React, { useContext } from 'react';
import { LanguageContext } from '../../translations/languageSelection'; // Import the context

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext)!; // Access the language context

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en"); // Toggle between English and French
  };

  return (
    <button onClick={toggleLanguage}>
      {language === "en" ? "Switch to French" : "Switch to English"}
    </button>
  );
};

export default LanguageSwitcher;
