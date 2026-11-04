// Modules
import React, { useContext, useState, useEffect, useRef } from 'react';

// Components
import ButtonCard from '../components/cards/buttonCard';
import ChooseModelCard from '../components/cards/chooseModelCard';
import ColorPicker from '../components/ui/colorPicker';
import CartFeatures from '../components/cards/cartFeatures';
import CollapsingDropdown from '../components/dropdown/collapsing.dropdown';
import BecomeDealer from '../components/sections/becomeDealer.section';
import TestRideSection from '../components/sections/testRide.section';
import SignupSection from '../components/sections/signup.section';
import ShrinkOrGrowImgSection from '../components/sections/shrinkOrGrowImg.section';

// Styles
import CartsModelsStyles from '../styles/cartModels.styles';
import MainStyles from '../styles/main.styles';
import CartStyles from '../styles/cards.style';

// Hooks
import { useWindowSize } from '../hooks/useWindowSize';

// Translations
import { translations } from '../translations/trans.thorSeries';
import { LanguageContext } from '../translations/languageSelection';

// Interfaces
import { i_cart_models_props } from '../interfaces/interfaces';

import version from '../config/version';
    
    // White Thor cut out of its grass photo (pikaso_edit-2.png), tires cleaned, ground shadow added
    const modelsImage = `/img/thor/Thor-WHITE-shadow.png?v=${version}`;
    const headerBgImage = `/img/thor/large-warehouse3-.jpg?v=${version}`;
    const headerCartImage=`/img/thor/Thor-GREEN-shadow.png?v=${version}`


const ThorSeries: React.FC<i_cart_models_props> = ({}) => {
    const cartsModelsStyles = CartsModelsStyles();
    const mainStyles = MainStyles();
    const cardStyles = CartStyles();
    const isMobile = useWindowSize();
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';
    const T = translations.thorSeries;
    const list = T.thor_list[L];

    const discoverShadowTitleImg = `/img/thor/ThorTextImg.png?v=${version}`;
    const discoverh2Span = T.h2_span_discover[L];
    const discoverh2 = T.h2_discover[L];
    const h2_discoverNext = T.h2_discoverNext[L];
    const discoverP = T.p_discover[L];

    const specTitles = [ T.h3_spec_dimensions[L], T.h3_spec_cargoBox[L], T.h3_spec_power[L], T.h3_spec_features[L] ];
    const specContents = [
        ["118″× 55″× 79″"],
        ["43″× 46″× 11″"],
        [...T.list_spec_power[L]],
        [...T.list_spec_features[L]]
    ];

    const features = [
        {
            image: `img/thor/thorFeatures/GOFT-CART-THOR-EGRAN.jpg?v=${version}`,
            title: T.t_features_screen[L],
            description: T.p_features_screen[L]
        },
        {
            image: `img/thor/thorFeatures/PNEU-ROUE-ROUGE-GORT-CART-THOR-2024-300x190.webp?v=${version}`,
            title: T.t_features_tires[L],
            description: T.p_features_tires[L]
        },
        {
            image: `img/thor/thorFeatures/GOFT-CART-THOR-ROUE-BLEU.jpg?v=${version}`,
            title: T.t_features_wheels[L],
            description: T.p_features_wheels[L]
        },
        {
            image: `img/thor/thorFeatures/GOFT-CART-THOR-BOX-CARGO.jpg?v=${version}`,
            title: T.t_features_cargoBox[L],
            description: T.p_features_cargoBox[L]
        },
        {
            image: `img/thor/thorFeatures/GOFT-CART-THOR-ATTACHE-REMORQUE-300x140.jpg?v=${version}`,
            title: T.t_features_hitch[L],
            description: T.p_features_hitch[L]
        },
        {
            image: `img/thor/thorFeatures/BUMPER-AVANT-GORT-CART-THOR.jpg?v=${version}`,
            title: T.t_features_bumper[L],
            description: T.p_features_bumper[L]
        },
    ];

    const shrinkGrowItems = [
        [
            { image: `img/thor/thorFeatures/CUP-HOLDER.jpg?v=${version}`, title: T.h2_shrink_cupHolders[L], paragraph: T.p_shrink_cupHolders[L] },
            { image: `img/thor/thorFeatures/Cargo-bucket.jpg?v=${version}`, title: T.h2_shrink_storage[L], paragraph: T.p_shrink_storage[L] },
            { image: `img/thor/thorFeatures/USB-CONNECTIONS.jpg?v=${version}`, title: T.h2_shrink_usbPorts[L], paragraph: T.p_shrink_usbPorts[L] }
        ]
    ];

    const hrRef = useRef<HTMLHRElement>(null);

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <>
            {/* Hero */}
            <header className="ev-model-hero">
                {/* The warehouse is decoration; the cart carries the page name */}
                <img className="ev-model-hero__bg" src={headerBgImage} alt="" />
                <img className="ev-model-hero__cart ev-model-hero__cart--thor" src={headerCartImage} alt={T.h1_title[L]} />
            </header>

                {/* Choose your model section */}
                <section style={{ paddingBottom: '2rem' }}>
                    <div style={{ ...mainStyles.container, textAlign: 'center' }}>
                        <h1 style={{ ...cartsModelsStyles.headerTitle, padding: '15px 0' }}>{T.h1_title[L]}</h1>
                        <hr ref={hrRef} style={{ ...mainStyles.hrStyle, width: '100%', marginInline: 'auto' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Duplicate of the h1 just above; hidden so the title shows once. */}
                            {/* <h2 style={{ ...mainStyles.title, fontSize: 'clamp(1.75rem, 1.3099rem + 1.8779vw, 3rem)', textShadow: '1px 1px 2px rgba(128, 138, 255, 0.7)' }}>{T.h1_title[L]}</h2> */}
                            <div style={{ ...mainStyles.sectionImageLeft, marginTop: '2rem'}}>
                            <div style={ cardStyles.chooseContainer }>
                                <div>
                                    <img src={modelsImage} alt={T.h1_title[L]} loading="lazy" style={ {...cardStyles.chooseImageStyle, width: isMobile ? '200px' : '300px', marginRight: isMobile ? '0' : '200px', marginBottom: isMobile ? '40px' : '0'}} />
                                </div>
                                <div>
                                <ul style={ cardStyles.chooseListStyle }>
                                    {list.map((item, index) => (
                                        <>
                                            <div style={mainStyles.flex}>
                                            <svg style={ cardStyles.chooseIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                <path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z"/>
                                            </svg>
                                            <li style={ cardStyles.chooseList} key={index}>{item}</li>
                                            </div>
                                        </>
                                    ))}
                                </ul>
                                </div>
                                <div>
                                    {/* <ColorPicker images={colorPickerImages} setSelectedColorIndex={setSelectedImage} /> */}
                                </div>
                            </div>
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '1.5rem'}}>{T.h3_colorPicker[L]}</h3>
                            {/* <ColorPicker images={modelsImage} setSelectedColorIndex={setSelectedColorIndex} /> */}
                            <p style={{...mainStyles.paragraph, fontSize: isMobile ? '14px' : '16px'}}>{T.p_colorPicker[L]}</p>
                            {/* <div style={{ marginTop: '2rem' }}>
                                <img style={{ ...cartsModelsStyles.touchScreenIcons, marginRight: '1rem'}} src="/img/main/Android_Auto_icon.svg.png" alt="Android Auto" loading="lazy" /><img style={cartsModelsStyles.touchScreenIcons} src="/img/main/900px-Apple_CarPlay_Logo.png" alt="Apple CarPlay" loading="lazy" />
                                <p style={{ ...mainStyles.paragraph, marginInline: 'auto' }}>{T.p_touch_screen_compatible[L]}</p>
                                <p style={{ fontSize: '14px', marginTop: '1rem', maxWidth: '110ch' }}>{T.p_touch_screen_aftermarks[L]}</p>
                            </div> */}
                        </div>
                    </div>
                </section>

            {/* Discover */}
            <section className="ev-discover ev-section">
                <div className="ev-container">
                    <img className="ev-discover__word ev-reveal" src={discoverShadowTitleImg} alt="" loading="lazy" />
                    <div className="ev-discover__grid">
                        <div className="ev-reveal ev-reveal--left">
                            <h2><span>{discoverh2Span}</span>{discoverh2}<br />{h2_discoverNext}</h2>
                            <p>{discoverP}</p>
                        </div>
                        <img className="ev-discover__img ev-reveal ev-reveal--right" src={`/img/thor/cartMontageThor.png?v=${version}`} alt={T.h1_title[L]} loading="lazy" />
                    </div>
                </div>
            </section>

                {/* Features section */}
                <section style={{ ...mainStyles.section}}>
                    <div style={{...mainStyles.container}}>
                        <div style={cartsModelsStyles.featuresGrid}>
                            {features.map((feature, index) => (
                                <CartFeatures key={index} image={feature.image} title={feature.title} description={feature.description} />
                            ))}
                        </div>
                    </div>
                </section>

            {/* Specifications */}
            <section className="ev-section" style={{ background: '#fff' }}>
                <div className="ev-container">
                    <h2 className="ev-section-title ev-reveal" style={{ marginBottom: '2.5rem' }}>{T.h2_spec_title[L]}</h2>
                    <div className="ev-specs ev-stagger">
                        {specTitles.map((title, index) => (
                            <CollapsingDropdown key={index} title={[title]} isOpen={openDropdown === index} onToggle={() => handleToggle(index)} >
                                {specContents[index].map((content, contentIndex) => (
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

            {/* Detail gallery */}
            <section className="ev-container">
                <div className="ev-reveal"><ShrinkOrGrowImgSection shrinkGrowItems={shrinkGrowItems[0]} /></div>
            </section>

            {/* Test ride */}
            <TestRideSection />

            {/* Newsletter */}
            <SignupSection />
        </>
    );
};

export default ThorSeries;
