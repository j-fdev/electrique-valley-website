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

    return (
        <>
            <header style={{...cartsModelsStyles.header}}>
                <img style={{...cartsModelsStyles.headerBgImage, height: isMobile ?  '600px' : 'auto', objectFit: isMobile ?  'cover' : 'unset', objectPosition: 'bottom'}} src={headerBgImage} alt="Thor Series" />
                <div style={cartsModelsStyles.headerOverlay}></div>
                <div><img style={{...cartsModelsStyles.headerCartImage,top: isMobile ? '5%' :  '15%', width: isMobile ? '320px' : '700px'}} src={headerCartImage} alt="" /></div>
            </header>
            <div >
                {/* Choose your model section */}
                <section style={{ ...mainStyles.section }}>
                    <div style={{ ...mainStyles.container, textAlign: 'center' }}>
                        <h1 style={{ ...cartsModelsStyles.headerTitle, padding: '15px 0' }}>{T.h1_title[L]}</h1>
                        <hr ref={hrRef} style={{ ...mainStyles.hrStyle, width: '100%', marginInline: 'auto' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* <h2 style={{ ...mainStyles.title, fontSize: 'clamp(1.75rem, 1.3099rem + 1.8779vw, 3rem)', textShadow: '1px 1px 2px rgba(128, 138, 255, 0.7)' }}>{T.h1_title[L]}</h2> */}
                            <div style={{ ...mainStyles.sectionImageLeft, marginTop: '2rem'}}>
                            <div style={ cardStyles.chooseContainer }>
                                <div>
                                    <img src={modelsImage} alt="Diablo carts" style={ {...cardStyles.chooseImageStyle, width: isMobile ? '200px' : '300px', marginRight: isMobile ? '0' : '200px', marginBottom: isMobile ? '40px' : '0'}} />
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
                           
                        </div>
                    </div>
                </section>
                {/* Discover section */}
                <section>
                    <div style={{...mainStyles.section, backgroundColor: 'var(--clr-bg-darkgray)', color: 'white'}}>
                        <div >
                            <div style={{ ...mainStyles.container, marginInline: 'auto', textAlign: 'center'}}><img style={cartsModelsStyles.bgLuxorTextImage} src={discoverShadowTitleImg} alt="" /></div>     
                            <div style={cartsModelsStyles.discoverWrapper}>
                                <div style={cartsModelsStyles.discoverContent}>
                                    <h2 style={{...cartsModelsStyles.subTitle, color: 'white'}}><span style={{ fontSize: '16px', letterSpacing: isMobile ? '0' : '9px'}}>{discoverh2Span}</span><br></br>{discoverh2}<br></br>{h2_discoverNext}</h2>
                                    <hr style={cartsModelsStyles.discoverHr} />
                                    <p style={{ maxWidth: '55ch'}}>{discoverP}</p>                  
                                </div>                                
                                {/* <img src="/img/diablo/cart interior.jpg" alt="Luxor Series" style={{...cartsModelsStyles.image, width: '400px'}} /> */}
                            </div>
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
                <hr style={mainStyles.specHrLight}/>
                {/* Specifications section */}
                <section style={{ ...mainStyles.section }}>
                    <div style={{ ...mainStyles.container }}>
                        <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '2rem' }}>{T.h2_spec_title[L]}</h2>
                        <hr style={ cartsModelsStyles.specHr} />
                        {specTitles.map((title, index) => (
                            <CollapsingDropdown key={index} title={[title]} isOpen={openDropdown === index} onToggle={() => handleToggle(index)} >
                                {specContents[index].map((content, contentIndex) => (
                                    <div key={contentIndex}>{content}</div>
                                ))}
                            </CollapsingDropdown>
                        ))}
                    </div>
                </section>
                <hr style={mainStyles.specHrLight}/>
                {/* Become a Dealer section */}
                <BecomeDealer />

                {/* Shrink and Grow section */}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 1rem', gap: '2rem' }}>
                    <div><ShrinkOrGrowImgSection shrinkGrowItems={shrinkGrowItems[0]}/></div>                                                                                 
                </div>
           
                {/* Test ride section */}
                <TestRideSection />
                
                <hr style={mainStyles.specHrLight}/>
                {/* SignUp section */}
                <SignupSection />
            </div>
        </>
    );
};

export default DiabloSeries;
