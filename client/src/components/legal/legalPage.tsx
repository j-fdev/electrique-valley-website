// Modules
import { useContext } from 'react';

// Translations
import { legal } from '../../translations/trans.legal';
import { LanguageContext } from '../../translations/languageSelection';

type Bilingual = { readonly fr: string; readonly en: string };
interface i_legal_page_props {
    title: Bilingual;
    sections: readonly { readonly title: Bilingual; readonly paragraphs: readonly Bilingual[] }[];
}

/** Privacy policy and terms of use: same layout, text from trans.legal.ts. */
const LegalPage: React.FC<i_legal_page_props> = ({ title, sections }) => {
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'fr';

    return (
        <>
            <section className="ev-page-hero">
                <div className="ev-container">
                    <h1>{title[L]}</h1>
                    <p>{legal.updated[L]}</p>
                </div>
            </section>
            <section>
                <div className="ev-prose ev-reveal">
                    {sections.map((section) => (
                        <div key={section.title.en} className="ev-prose__block">
                            <h2>{section.title[L]}</h2>
                            {section.paragraphs.map((p) => <p key={p.en}>{p[L]}</p>)}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default LegalPage;
