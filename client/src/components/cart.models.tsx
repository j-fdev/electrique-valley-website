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
import SignupSection from './sections/signup.section';
import ShrinkOrGrowImgSection from '../components/sections/shrinkOrGrowImg.section';

// Styles
import CartsModelsStyles from '../styles/cartModels.styles';
import MainStyles from '../styles/main.styles';

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
    const cartsModelsStyles = CartsModelsStyles();
    const mainStyles = MainStyles();
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

    return (
        <>
            <header style={cartsModelsStyles.header}>
                {headerIsElite === false ? 
                (<img style={cartsModelsStyles.headerBgImage} src={`${headerBgImage}?v=${version}`} alt={altProp} />) :
                 (<img style={{...cartsModelsStyles.headerBgImage, width: '2000px', height: 'auto'}} src={`${headerBgImage}?v=${version}`} alt={altProp} />) }
                <div style={cartsModelsStyles.headerOverlay}></div>
                {/* <img style={{...cartsModelsStyles.headerCartImage,top: isMobile ? '5%' :  '15%', width: isMobile ? '320px' : '700px'}} src={headerCartImage} alt="" /></div> */}
                {headerIsElite === false ? 
                (<div><img style={cartsModelsStyles.headerCartImage} src={`${headerCartImage}?v=${version}`} alt="" /></div>) :
                (<div><img style={{...cartsModelsStyles.headerCartImage, width: '1200px', height: 'auto'}} src={`${headerCartImage}?v=${version}`} alt="" /></div>)
                }
            </header>
            <div >
                {/* Choose your model section */}
                <section>
                    <div style={{ ...mainStyles.container, textAlign: 'center' }}>
                        <h1 style={{ ...cartsModelsStyles.headerTitle, padding: '15px 0' }}>{headerTitle}</h1>
                        <h2 style={{ ...mainStyles.title, color: 'var(--clr-dark-blue)' }}>{chooseModelsH2}</h2>
                        <hr style={{ ...mainStyles.hrStyle, width: '25%', marginInline: 'auto' }} />
                        <div style={ cartsModelsStyles.buttonCardContainer}>
                            {(buttonCards ?? []).map((card, index) => (
                                <ButtonCard key={index} customDivStyle={{ width: '250px', height: 'auto' }} customImageStyle={{ width: '200px' }} customTextStyle={{ color: 'var(--clr-dark-blue)', fontSize: '1.5rem' }} image={card.image} title={card.title} onClick={() => handleButtonCardClick(index)} />
                            ))}
                        </div>
                        <hr ref={hrRef} style={{ ...mainStyles.hrStyle, width: '100%', marginInline: 'auto' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h2 style={{ ...mainStyles.title, fontSize: 'clamp(1.75rem, 1.3099rem + 1.8779vw, 3rem)', textShadow: '1px 1px 2px rgba(128, 138, 255, 0.7)' }}>{modelsTitle?.[selectedListIndex] ?? ''}</h2>
                            {((!isLuxorPage && currentModelIndex === 2) || (!isLuxorPage && currentModelIndex === 3)) && (
                                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                    <img src={`/img/d-max/4x4-icon.png?v=${version}`} alt="4WD Icon" style={{ width: '100px', height: 'auto'}} />
                                    <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 'bold'}}>
                                        {p_4wd_available}
                                    </p>
                                </div>
                            )}
                            <div style={{ ...mainStyles.sectionImageLeft, marginTop: '2rem'}}>
                                <ChooseModelCard image={modelsImages?.[selectedListIndex]?.[selectedColorIndex] ?? ''} list={[...(lists?.[selectedListIndex] ?? [])]} />
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: '1.5rem'}}>{colorPickerH3}</h3>
                            <ColorPicker images={modelsImages?.[selectedListIndex] ?? []} setSelectedColorIndex={setSelectedColorIndex} />
                            <p style={{...mainStyles.paragraph, fontSize: isMobile ? '14px' : '16px'}}>{colorPickerP}</p>
                            {!isClassicPage && (
                            <div style={{ marginTop: '2rem' }}>
                                <img style={{ ...cartsModelsStyles.touchScreenIcons, marginRight: '1rem'}} src={`img/main/Android_Auto_icon.svg.png?v=${version}`} alt="" /><img style={cartsModelsStyles.touchScreenIcons} src={`img/main/900px-Apple_CarPlay_Logo.png?v=${version}`} alt="" />
                                <p style={{ ...mainStyles.paragraph, marginInline: 'auto' }}>{T.p_touch_screen_compatible[L]}</p>
                                <p style={{ fontSize: '14px', marginTop: '1rem', maxWidth: '110ch' }}>{T.p_touch_screen_aftermarks[L]}</p>
                            </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* Discover section */}
                <section>
                    <div style={{...mainStyles.section, backgroundColor: 'var(--clr-bg-darkgray)', color: 'white'}}>
                        <div >
                            <div style={{    
                                    ...mainStyles.container, 
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginInline: 'auto', 
                                    textAlign: 'center'}}>
                                <img style={{  ...cartsModelsStyles.bgLuxorTextImage, maxWidth: '100%', height: 'auto', margin: '0 auto'}} src={`${discoverShadowTitleImg}?v=${version}`} alt="" />
                            </div>     
                            <div style={cartsModelsStyles.discoverWrapper}>
                                <div style={cartsModelsStyles.discoverContent}>
                                    <h2 style={{...cartsModelsStyles.subTitle, color: 'white'}}><span style={{ fontSize: '16px', letterSpacing: isMobile ? '0' : '9px'}}>{discoverh2Span}</span><br></br>{discoverh2}<br></br>{h2_discoverNext}</h2>
                                    <hr style={cartsModelsStyles.discoverHr} />
                                    <p style={{ maxWidth: '55ch'}}>{discoverP}</p>                  
                                </div> 
                                <div style={{}}>
                                    <img src={`${discoverMontageImage}?v=${version}`} alt="Cart Series Montage" style={cartsModelsStyles.image} />
                                </div>                               
                            </div>
                        </div>
                    </div>
                </section>
                {/* Features section */}
                <section style={{ ...mainStyles.section}}>
                    <div style={{...mainStyles.container}}>
                        <div style={cartsModelsStyles.featuresGrid}>
                            {(features ?? []).map((feature, index) => (
                                <CartFeatures key={index} image={`${feature.image}?v=${version}`} title={feature.title} description={feature.description} />
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
                        {(specTitles ?? []).map((title, index) => (
                            <CollapsingDropdown key={index} title={[title]} isOpen={openDropdown === index} onToggle={() => handleToggle(index)} >
                                {(specContents?.[index] ?? []).map((content, contentIndex) => (
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
                    <div><ShrinkOrGrowImgSection shrinkGrowItems={shrinkGrowItems?.[0] ?? []}/></div>
                    <div style={{ }}><ShrinkOrGrowImgSection shrinkGrowItems={shrinkGrowItems?.[1] ?? []}/></div>                                                                                    
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

export default CartModels;