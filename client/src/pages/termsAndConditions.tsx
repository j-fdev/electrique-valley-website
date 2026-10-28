// Modules
import React, { useContext, useState, useEffect, useRef } from 'react';

// Components

// Styles
import MainStyles from '../styles/main.styles';

// Hooks
import { useWindowSize } from '../hooks/useWindowSize';

// Translations
import { translations } from '../translations/trans.termsAndConditions';
import { LanguageContext } from '../translations/languageSelection';

const TermsAndConditions = () => {
    const isMobile = useWindowSize();   
    const mainStyles = MainStyles();
    const T = translations.TermsAndConditions; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    return ( 
        <section style={{ ...mainStyles.section }}>
            <div style={{ ...mainStyles.container }}>
                <h1 style={{ ...mainStyles.title }}>{T.title[L]}</h1>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_general[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_general[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_riskLoss[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_riskLoss[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_deliverAndDelay[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_deliverAndDelay[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_setOffs[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_setOffs[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_patents[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_patents[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_productDisplay[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_productDisplay[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_WarrantyNew[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_WarrantyNew[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_WarrantyUsed[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_WarrantyUsed[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_WarrantyGenerally[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_WarrantyGenerally[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_Operation[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_Operation[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_ComplianceWithLaws[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_ComplianceWithLaws[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_LimitationOfLiability[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_LimitationOfLiability[L]}</p>
                <h2 style={{ ...mainStyles.subtitle }}>{T.h2_Miscellaneous[L]}</h2>
                <p style={{ marginTop: isMobile ? '1rem' : '1.5rem' }}>{T.p_Miscellaneous[L]}</p>
            </div>
        </section>
    );
};

export default TermsAndConditions;
