// Modules
import React, { useContext, useState, useEffect, useRef } from 'react';

// Components
import ColorPicker from '../components/ui/colorPicker';
import CartFeatures from '../components/cards/cartFeatures';
import CollapsingDropdown from '../components/dropdown/collapsing.dropdown';
import BecomeDealer from '../components/sections/becomeDealer.section';
import TestRideSection from '../components/sections/testRide.section';
import SignupSection from './sections/signup.section';
import ShrinkOrGrowImgSection from '../components/sections/shrinkOrGrowImg.section';

// Styles

// Hooks
import { useWindowSize } from '../hooks/useWindowSize';

// Translations
import { translations } from '../translations/trans.luxorSeries';
import { LanguageContext } from '../translations/languageSelection';

// Interfaces
import { i_cart_models_props } from '../interfaces/interfaces';

import version from '../config/version';

const CartModels: React.FC<i_cart_models_props> = ({
    headerBgImage,
    altProp,
    headerCartImage,
    headerTitle,
    chooseModelsH2,
    buttonCards,
    currentModelIndex,
    onModelChange,
    p_4wd_available,
    modelsTitle,
    modelsImages,
    lists,
    colorPickerH3,
    colorPickerP,
    features,
    discoverShadowTitleImg,
    discoverh2Span,
    discoverh2,
    discoverMontageImage,
    h2_discoverNext,
    discoverP,
    specTitles,
    specContents,
    shrinkGrowItems,
    isClassicPage = false,
    isLuxorPage,
    headerIsElite = false
}) => {
    const isMobile = useWindowSize();
    const T = translations.luxorSeries;

    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [selectedListIndex, setSelectedListIndex] = useState(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const hrRef = useRef<HTMLHRElement>(null);

    useEffect(() => {
        setSelectedColorIndex(0);
    }, [selectedListIndex]);

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleButtonCardClick = (index: number) => {
        setSelectedListIndex(index);
        onModelChange?.(index);
        if (hrRef.current) {
        const offset = 100; // Adjust this value based on your navbar height
        const elementPosition = hrRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    };

    const boltPath = "M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z";
    const show4wd = !isLuxorPage && (currentModelIndex === 2 || currentModelIndex === 3);

    return (
        <>
            {/* Hero */}
            <header className="ev-model-hero">
                <img className="ev-model-hero__bg" src={`${headerBgImage}?v=${version}`} alt={altProp} />
                <img className={`ev-model-hero__cart${headerIsElite ? ' ev-model-hero__cart--wide' : ''}`} src={`${headerCartImage}?v=${version}`} alt="" />
            </header>

            {/* Choose your model */}
            <section className="ev-section" style={{ paddingTop: 0 }}>
                <div className="ev-container">
                    <div className="ev-model-intro ev-reveal">
                        <h1>{headerTitle}</h1>
                        <h2>{chooseModelsH2}</h2>
                    </div>

                    <div className="ev-model-tabs ev-stagger">
                        {(buttonCards ?? []).map((card, index) => (
                            <button
                                key={index}
                                className={`ev-model-tab${selectedListIndex === index ? ' is-active' : ''}`}
                                onClick={() => handleButtonCardClick(index)}
                            >
                                <img src={card.image} alt={card.title} loading="lazy" />
                                <span>{card.title}</span>
                            </button>
                        ))}
                    </div>

                    <hr ref={hrRef} style={{ border: 'none', margin: 0 }} />

                    <div className="ev-model-detail ev-reveal">
                        <div className="ev-model-detail__title">
                            <h2 style={{ margin: 0, fontSize: 'inherit' }}>{modelsTitle?.[selectedListIndex] ?? ''}</h2>
                            {show4wd && (
                                <div className="ev-4wd">
                                    <img src={`/img/d-max/4x4-icon.png?v=${version}`} alt="4WD" />
                                    {p_4wd_available}
                                </div>
                            )}
                        </div>
                        <img
                            key={`${selectedListIndex}-${selectedColorIndex}`}
                            className="ev-model-detail__img"
                            src={modelsImages?.[selectedListIndex]?.[selectedColorIndex] ?? ''}
                            alt={modelsTitle?.[selectedListIndex] ?? ''}
                        />
                        <ul className="ev-model-specs">
                            {(lists?.[selectedListIndex] ?? []).map((item, index) => (
                                <li key={index}>
                                    <svg viewBox="0 0 384 512" aria-hidden="true"><path d={boltPath} /></svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ev-colors-block ev-reveal">
                        <h3>{colorPickerH3}</h3>
                        <ColorPicker images={modelsImages?.[selectedListIndex] ?? []} selectedIndex={selectedColorIndex} setSelectedColorIndex={setSelectedColorIndex} />
                        <p>{colorPickerP}</p>
                    </div>

                    {!isClassicPage && (
                        <div className="ev-carplay ev-reveal">
                            <div className="ev-carplay__logos">
                                <img src={`/img/main/Android_Auto_icon.svg.png?v=${version}`} alt="Android Auto" />
                                <img src={`/img/main/900px-Apple_CarPlay_Logo.png?v=${version}`} alt="Apple CarPlay" />
                            </div>
                            <p>{T.p_touch_screen_compatible[L]}</p>
                            <p>{T.p_touch_screen_aftermarks[L]}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Discover */}
            <section className="ev-discover ev-section">
                <div className="ev-container">
                    <img className="ev-discover__word ev-reveal" src={`${discoverShadowTitleImg}?v=${version}`} alt="" />
                    <div className="ev-discover__grid">
                        <div className="ev-reveal ev-reveal--left">
                            <h2><span>{discoverh2Span}</span>{discoverh2}<br />{h2_discoverNext}</h2>
                            <p>{discoverP}</p>
                        </div>
                        <img className="ev-discover__img ev-reveal ev-reveal--right" src={`${discoverMontageImage}?v=${version}`} alt="Cart Series Montage" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="ev-section">
                <div className="ev-container">
                    <div className="ev-features-cards ev-stagger">
                        {(features ?? []).map((feature, index) => (
                            <CartFeatures key={index} image={`${feature.image}?v=${version}`} title={feature.title} description={feature.description} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Specifications */}
            <section className="ev-section" style={{ background: '#fff' }}>
                <div className="ev-container">
                    <h2 className="ev-section-title ev-reveal" style={{ marginBottom: '2.5rem' }}>{T.h2_spec_title[L]}</h2>
                    <div className="ev-specs ev-stagger">
                        {(specTitles ?? []).map((title, index) => (
                            <CollapsingDropdown key={index} title={[title]} isOpen={openDropdown === index} onToggle={() => handleToggle(index)} >
                                {(specContents?.[index] ?? []).map((content, contentIndex) => (
                                    <div key={contentIndex}>{content}</div>
                                ))}
                            </CollapsingDropdown>
                        ))}
                    </div>
                </div>
            </section>

            {/* Become a Dealer */}
            <div style={{ paddingTop: 'clamp(3.5rem, 8vw, 7rem)' }}>
                <BecomeDealer />
            </div>

            {/* Detail galleries */}
            <section className="ev-container" style={{ display: 'grid', gap: '12px' }}>
                <div className="ev-reveal"><ShrinkOrGrowImgSection shrinkGrowItems={shrinkGrowItems?.[0] ?? []} /></div>
                <div className="ev-reveal"><ShrinkOrGrowImgSection shrinkGrowItems={shrinkGrowItems?.[1] ?? []} /></div>
            </section>

            {/* Test ride */}
            <TestRideSection />

            {/* Newsletter */}
            <SignupSection />
        </>
    );
};

export default CartModels;