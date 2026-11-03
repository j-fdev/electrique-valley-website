// Modules
import React, { useState, useContext } from 'react';
import version from '../config/version';

// Components
import CartModels from '../components/cart.models';
import CollapsingDropdown from '../components/dropdown/collapsing.dropdown';
import ShrinkOrGrowImgSection from '../components/sections/shrinkOrGrowImg.section';
import VideoShowcase from '../components/videoShowcase/videoShowcase';

// Translations
import { translations } from '../translations/trans.evolutionSeries';
import { LanguageContext } from '../translations/languageSelection';

const DMaxSeries = () => {
    const T = translations.evolutionSeries;
     
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [currentModelIndex, setCurrentModelIndex] = useState(0);

    const modelsTitle = [ T.modelsTitle_ev4[L], T.modelsTitle_ev6[L], T.modelsTitle_ev4L[L], T.modelsTitle_ev6L[L] ];
    
  
    const modelsImages = [
        [`/img/d-max/GT4/Evolution4-color-ARCTIC-GRAY.png?v=${version}`,`/img/d-max/GT4/Evolution4-color-BLACK-SAPPHIRE.png?v=${version}`,`/img/d-max/GT4/Evolution4-color-FLAMENCO-RED-2.png?v=${version}`,`/img/d-max/GT4/Evolution4-color-MINERAL-WHITE.png?v=${version}`,`/img/d-max/GT4/Evolution4-color-PORTIMAO-BLUE.png?v=${version}`,`/img/d-max/GT4/Evolution4-color-SKY-BLUE.png?v=${version}`,],
        [`/img/d-max/GT6/Evolution6-color-MINERAL-WHITE.png?v=${version}`,`/img/d-max/GT6/Evolution6-color-ARCTIC-GRAY.png?v=${version}`,`/img/d-max/GT6/Evolution6-color-BLACK-SAPPHIRE.png?v=${version}`,`/img/d-max/GT6/Evolution6-color-FLAMENCO-RED-2.png?v=${version}`,`/img/d-max/GT6/Evolution6-color-PORTIMAO-BLUE.png?v=${version}`,`/img/d-max/GT6/Evolution6-color-SKY-BLUE.png?v=${version}`,],
        [`/img/d-max/XT4/Evolution4L-color-SKY-BLUE.png?v=${version}`,`/img/d-max/XT4/Evolution4L-color-ARCTIC-GRAY.png?v=${version}`,`/img/d-max/XT4/Evolution4L-color-BLACK-SAPPHIRE.png?v=${version}`,`/img/d-max/XT4/Evolution4L-color-FLAMENCO-RED-2.png?v=${version}`,`/img/d-max/XT4/Evolution4L-color-MINERAL-WHITE.png?v=${version}`,`/img/d-max/XT4/Evolution4L-color-PORTIMAO-BLUE.png?v=${version}`,],
        [`/img/d-max/XT6/Evolution6L-4wd-color-PORTIMAO-BLUE.png?v=${version}`,`/img/d-max/XT6/Evolution6L-4wd-color-ARCTIC-GRAY.png?v=${version}`,`/img/d-max/XT6/Evolution6L-4wd-color-BLACK-SAPPHIRE.png?v=${version}`,`/img/d-max/XT6/Evolution6L-4wd-color-FLAMENCO-RED-2.png?v=${version}`,`/img/d-max/XT6/Evolution6L-4wd-color-MINERAL-WHITE.png?v=${version}`,`/img/d-max/XT6/Evolution6L-4wd-color-SKY-BLUE.png?v=${version}`,]
    ];
    
    const lists = [ T.evolution4_list[L], T.evolution6_list[L], T.evolution4L_list[L], T.evolution6L_list[L] ];

    const features = [
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-10.1_-TOUCHSCREEN-WITH-Carplay-Compatibility.jpg?v=${version}`,
            title: T.t_features_screen[L],
            description: T.p_features_screen[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-16-speaker-Sound-System-golf-2.jpg?v=${version}`,
            title: T.t_features_speakers[L],
            description: T.p_features_speakers[L]
        },
        ...(currentModelIndex === 2 || currentModelIndex === 3 ? [{
            image: `img/d-max/D_MaxFeatures/Features--4-WHEEL-DRIVE.jpg?v=${version}`,
            title: T.t_features_4x4[L],
            description: T.p_features_4x4[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-Electric-Power-Steering.jpg?v=${version}`,
            title: T.t_features_power_steering[L],
            description: T.p_features_power_steering[L]
        }] : []),
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-DOUBLE-WIRELESS-MOBILE-PHONE-CHARGING.jpg?v=${version}`,
            title: T.t_features_charging_pads[L],
            description: T.p_features_charging_pads[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-BUILT-IN-DASH-REFRIGERATOR.jpg?v=${version}`,
            title: T.t_features_fridge[L],
            description: T.p_features_fridge[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-Foldable-rear-storage-basket-1.jpg?v=${version}`,
            title: T.t_features_rear_storage[L],
            description: T.p_features_rear_storage[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-Detachable-drag-insulation-box-1.jpg?v=${version}`,
            title: T.t_features_cooler[L],
            description: T.p_features_cooler[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-GOLF-BAG-HOLDER.jpg?v=${version}`,
            title: T.t_features_bag_holders[L],
            description: T.p_features_bag_holders[L]
        },
        ...(currentModelIndex === 2 || currentModelIndex === 3 ? [{
            image: `img/d-max/D_MaxFeatures/Features-ALL-LUMINOUS-SIDE-STEPS-4.jpg?v=${version}`,
            title: T.t_features_running_boards[L],
            description: T.p_features_running_boards[L]
        }] : [{
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-Advanced-Dash-Panel.jpg?v=${version}`,
            title: T.t_features_dash[L],
            description: T.p_features_dash[L]
        }]),
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-SAFETY-BELT.jpg?v=${version}`,
            title: T.t_features_seats[L],
            description: T.p_features_seats[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-SEAT-BACKCOVER-ASSEMBLY.jpg?v=${version}`,
            title: T.t_features_seat_acc[L],
            description: T.p_features_seat_acc[L]
        },
        {
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-led-LIGHTING.jpg?v=${version}`,
            title: T.t_features_leds[L],
            description: T.p_features_leds[L]
        },
        ...(currentModelIndex === 2 || currentModelIndex === 3 ? [{
            image: `img/d-max/D_MaxFeatures/Features-ALL-16-SILENT-TIRE-WITH-OFF-ROAD-THREAD.jpg?v=${version}`,
            title: T.t_features_bigger_wheels[L],
            description: T.p_features_bigger_wheels[L]
        }] : [{
            image: `img/d-max/D_MaxFeatures/Features-ALL-d6-16-RADIAL-TIRE.jpg?v=${version}`,
            title: T.t_features_wheels[L],
            description: T.p_features_wheels[L]
        }])
    ];

    const buttonCards = [
        { image: `/img/d-max/GT4/Evolution4-color-ARCTIC-GRAY.png?v=${version}`, title: T.modelsTitle_ev4[L], index: 0 },
        { image: `/img/d-max/GT6/Evolution6-color-MINERAL-WHITE.png?v=${version}`, title: T.modelsTitle_ev6[L], index: 1 },
        { image: `/img/d-max/XT4/Evolution4L-color-SKY-BLUE.png?v=${version}`, title: T.modelsTitle_ev4L[L], index: 2 },
        { image: `/img/d-max/XT6/Evolution6L-4wd-color-PORTIMAO-BLUE.png?v=${version}`, title: T.modelsTitle_ev6L[L], index: 3 },
    ];

    const discoverShadowTitleImg = `/img/d-max/dmax_text.png?v=${version}`;
    const discoverh2Span = T.h2_span_discover[L];
    const discoverh2 = T.h2_discover[L];
    const h2_discoverNext = T.h2_discoverNext[L];
    const discoverP = T.p_discover[L];
    const discoverMontageImage = `/img/d-max/evolution_montage.png?v=${version}`;

    const specTitles = [ T.h3_spec_dimensions[L], T.h3_spec_power[L], T.h3_spec_features[L] ];
    const specContents = [
        currentModelIndex === 0 ? ["122.6×56.1(rearview mirror)×83.7 inch"] :
        currentModelIndex === 1 ? ["156.1×56.1(rearview mirror)×84.6 inch"] :
        currentModelIndex === 2 ? ["122.6×56.1(rearview mirror)×83.9 inch"] :
        ["156.1×56.1(rearview mirror)×84.8 inch"],
        currentModelIndex === 0 || currentModelIndex === 1 ?
        [...T.list_spec_power[L]] :
        [...T.list_spec_power4x4[L]],
        currentModelIndex === 0 || currentModelIndex === 1 ?
        [...T.list_spec_features[L]] :
        [...T.list_spec_features4x4[L]]
    ]

    const shrinkGrowItems = [
        [
            { image: `img/d-max/D_MaxFeatures/Feature-other-MICROPHONE.jpg?v=${version}`, title: T.h2_shrink_microphone[L], paragraph: T.p_shrink_microphone[L] },
            { image: `img/d-max/D_MaxFeatures/Feature-other-CUP-HOLDERS.jpg?v=${version}`, title: T.h2_shrink_cupHolders[L], paragraph: T.p_shrink_cupHolders[L] },
            { image: `img/d-max/D_MaxFeatures/Sliding Windshield Vents.png?v=${version}`, title: T.h2_shrink_airVent[L], paragraph: T.p_shrink_airVent[L] },
            { image: `img/d-max/D_MaxFeatures/Feature-other-STORAGE-COMPARTMENT.jpg?v=${version}`, title: T.h2_shrink_storage[L], paragraph: T.p_shrink_storage[L] },
            { image: `img/d-max/D_MaxFeatures/Feature-other-ADJUSTABLE-STEERING-COLUMN.jpg?v=${version}`, title: T.h2_shrink_ajustable_steering[L], paragraph: T.p_shrink_ajustable_steering[L] },
            { image: `img/d-max/D_MaxFeatures/Feature-other-LED-LOGO-LIGHT.jpg?v=${version}`, title: T.h2_shrink_tailLight[L], paragraph: T.p_shrink_tailLight[L] }
        ],
        [
            { image: `img/d-max/D_MaxFeatures/Panoramic Rear View Mirror.png?v=${version}`, title: T.h2_shrink_mirror[L], paragraph: T.p_shrink_mirror[L] },
            { image: `img/d-max/D_MaxFeatures/Side Mirrors with Turning Signals.png?v=${version}`, title: T.h2_shrink_sideMirror[L], paragraph: T.p_shrink_sideMirror[L] },
            { image: `img/d-max/D_MaxFeatures/Side Grab Handles.png?v=${version}`, title: T.h2_shrink_sideGrabHandles[L], paragraph: T.p_shrink_sideGrabHandles[L] },
            { image: `img/d-max/D_MaxFeatures/Feature-other-BRUSH-GUARD-FOR-LIFTED-MODELS.jpg?v=${version}`, title: T.h2_shrink_brushGuards[L], paragraph: T.p_shrink_brushGuards[L] },
            { image: `img/d-max/D_MaxFeatures/Towing Hitch Receiver.png?v=${version}`, title: T.h2_shrink_hitch[L], paragraph: T.p_shrink_hitch[L] },
            { image: `img/d-max/D_MaxFeatures/Accelerator & Brake Pedal.png?v=${version}`, title: T.h2_shrink_pedals[L], paragraph: T.p_shrink_pedals[L] }
        ]

    ];

    return (
        <div>
            <CartModels 
                headerBgImage="/img/d-max/Evolution_water_Bg.png"
                altProp="D-MAX Series"
                headerCartImage="/img/d-max/XT4/Evolution4L-color-BLACK-SAPPHIRE.png?v=${version}"
                headerTitle={T.h1_title[L]}
                chooseModelsH2={T.h2_choose_your_model[L]}
                modelsTitle={modelsTitle}
                modelsImages={modelsImages}
                lists={lists}
                colorPickerH3={T.h3_colorPicker[L]}
                colorPickerP={T.p_colorPicker[L]}
                features={features}
                buttonCards={buttonCards}
                currentModelIndex={currentModelIndex}
                onModelChange={(index) => setCurrentModelIndex(index)}
                p_4wd_available={T.p_4wd_available[L]}
                discoverShadowTitleImg={discoverShadowTitleImg}
                discoverh2Span={discoverh2Span}
                discoverh2={discoverh2}
                h2_discoverNext={h2_discoverNext}
                discoverP={discoverP}
                discoverMontageImage={discoverMontageImage}
                specTitles={specTitles}
                specContents={specContents} 
                shrinkGrowItems={shrinkGrowItems}            
            />
  
        </div>
    );
};

export default DMaxSeries;