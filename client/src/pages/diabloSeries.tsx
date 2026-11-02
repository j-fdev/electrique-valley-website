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
import { translations } from '../translations/trans.diabloSeries';
import { LanguageContext } from '../translations/languageSelection';

// Interfaces
import { i_cart_models_props } from '../interfaces/interfaces';

import version from '../config/version';
    
    const modelsImage = `/img/diablo/Diablo-bour.jpg?v=${version}`;
    const headerBgImage = `/img/diablo/beautiful-campsite2.jpg?v=${version}`;
    const headerCartImage = `/img/diablo/diablo_gray.png?v=${version}`;

const DiabloSeries: React.FC<i_cart_models_props> = ({}) => {
    const cartsModelsStyles = CartsModelsStyles();
    const mainStyles = MainStyles();
    const cardStyles = CartStyles();
    const isMobile = useWindowSize();
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';
    const T = translations.diabloSeries;
    const list = T.diabloSeries_list[L];

    const discoverShadowTitleImg = "/img/diablo/DiabloTextImg.png";
    const discoverh2Span = T.h2_span_discover[L];
    const discoverh2 = T.h2_discover[L];
    const h2_discoverNext = T.h2_discoverNext[L];
    const discoverP = T.p_discover[L];

    const specTitles = [ T.h3_spec_dimensions[L], T.h3_spec_power[L], T.h3_spec_features[L] ];
    const specContents = [
        ["118″× 55″× 79″"],
        [...T.list_spec_power[L]],
        [...T.list_spec_features[L]]
    ];

    const features = [
        {
            image: `img/diablo/diabloFeatures/Screen_sideway2-1.webp?v=${version}`,
            title: T.t_features_screen[L],
            description: T.p_features_screen[L]
        },
        {
            image: `img/diablo/diabloFeatures/back-trunk-cart.webp?v=${version}`,
            title: T.t_features_rear_seats[L],
            description: T.p_features_rear_seats[L]
        },
        {
            image: `img/diablo/diabloFeatures/redbench.webp?v=${version}`,
            title: T.t_features_seats[L],
            description: T.p_features_seats[L]
        },
        {
            image: `img/diablo/diabloFeatures/blackTireRIm.webp?v=${version}`,
            title: T.t_features_tires[L],
            description: T.p_features_tires[L]
        },
        {
            image: `img/diablo/diabloFeatures/cooler.webp?v=${version}`,
            title: T.t_features_cooler[L],
            description: T.p_features_cooler[L]
        },
        {
            image: `img/diablo/diabloFeatures/suspension.webp?v=${version}`,
            title: T.t_features_suspension[L],
            description: T.p_features_suspension[L]
        },
    ];


    const shrinkGrowItems = [
        [
            { image: `img/diablo/diabloFeatures/frontlights.jpg?v=${version}`, title: T.h2_shrink_Ledlight[L] },
            { image: `img/diablo/diabloFeatures/backtrunk cart.jpg?v=${version}`, title: T.h2_shrink_storage[L], paragraph: T.p_shrink_storage[L] },
            { image: `img/diablo/diabloFeatures/usb.jpg?v=${version}`, title: T.h2_shrink_usbPorts[L], paragraph: T.p_shrink_usbPorts[L] },
            { image: `img/diablo/diabloFeatures/rearcamera.jpg?v=${version}`, title: T.h2_shrink_BackupCam[L] }
        ]
    ];

    const hrRef = useRef<HTMLHRElement>(null);

    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const boltPath = "M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z";

    return (
        <>
            {/* Hero */}
            <header className="ev-model-hero">
                <img className="ev-model-hero__bg" src={headerBgImage} alt="Diablo Series" />
                <img className="ev-model-hero__cart" style={{ width: 'min(760px, 80%)' }} src={headerCartImage} alt="" />
            </header>

            {/* Model */}
            <section className="ev-section" style={{ paddingTop: 0 }}>
                <div className="ev-container">
                    <div className="ev-model-intro ev-reveal">
                        <h1>{T.h1_title[L]}</h1>
                    </div>
                    <hr ref={hrRef} style={{ border: 'none', margin: 0 }} />
                    <div className="ev-model-detail ev-reveal">
                        <img className="ev-model-detail__img" src={modelsImage} alt="Diablo Series" />
                        <ul className="ev-model-specs">
                            {list.map((item, index) => (
                                <li key={index}>
                                    <svg viewBox="0 0 384 512" aria-hidden="true"><path d={boltPath} /></svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Discover */}
            <section className="ev-discover ev-section">
                <div className="ev-container">
                    <img className="ev-discover__word ev-reveal" src={discoverShadowTitleImg} alt="" />
                    <div className="ev-reveal" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
                        <h2><span>{discoverh2Span}</span>{discoverh2}<br />{h2_discoverNext}</h2>
                        <p style={{ marginInline: 'auto' }}>{discoverP}</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="ev-section">
                <div className="ev-container">
                    <div className="ev-features-cards ev-stagger">
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

export default DiabloSeries;
