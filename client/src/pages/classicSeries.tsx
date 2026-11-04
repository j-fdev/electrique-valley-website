// Modules
import React, { useContext } from 'react';
import version from '../config/version';

// Components
import CartModels from '../components/cart.models';
import CollapsingDropdown from '../components/dropdown/collapsing.dropdown';
import ShrinkOrGrowImgSection from '../components/sections/shrinkOrGrowImg.section';
import VideoShowcase from '../components/videoShowcase/videoShowcase';

// Translations
import { translations } from '../translations/trans.classicSeries';
import { LanguageContext } from '../translations/languageSelection';

const ClassicSeries = () => {
    const T = translations.classicSeries;

    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [currentModelIndex, setCurrentModelIndex] = React.useState(0);

    const modelsTitle = [ 'Classic 2+2', 'Classic Thor' ];
    
    const modelsImages = [
        [`/img/classic/classic_2+2/ARCTIC-GRAY.png?v=${version}`, `/img/classic/classic_2+2/BLACK-SAPPHIRE.png?v=${version}`, `/img/classic/classic_2+2/MINERAL-WHITE.png?v=${version}`, `/img/classic/classic_2+2/PLAMENCO.png?v=${version}`, `/img/classic/classic_2+2/sky-BLUE.png?v=${version}`],
        [`/img/classic/classic_thor/classic_thor_WHITE.png?v=${version}`]
    ];
    
    const lists = [ T.classic_2_2_list[L], T.classic_thor_list[L] ];

    const features = [
        {
            image: `/img/classic/classic_features/detail-classic-4plus-CUP-HOLDER.jpg?v=${version}`,
            title: T.t_cup_holder[L],
            description: T.p_cup_holder[L]
        },
        {
            image: `/img/classic/classic_features/detail-classic-4plus-STORAGE-COMPARTMENT.jpg?v=${version}`,
            title: T.t_storage[L],
            description: T.p_storage[L]
        },
        {
            image: `/img/classic/classic_features/detail-classic-4plus-LITHIUM-ION-BATTERY.jpg?v=${version}`,
            title: T.t_battery[L],
            description: T.p_battery[L]
        },
        {
            image: `/img/classic/classic_features/detail-classic-4plus-TIRE.jpg?v=${version}`,
            title: T.t_tire[L],
            description: T.p_tire[L]
        },
         {
            image: `/img/classic/classic_features/Classic-TOUCH-SCREEN.jpg?v=${version}`,
            title: T.t_screen[L],
            description: T.p_screen[L]
        },
           {
            image: `/img/classic/classic_features/Classic-Ball-Holder.jpg?v=${version}`,
            title: T.t_golfBalls[L],
            description: T.p_golfBalls[L]
        },
        ...(currentModelIndex === 1 ? [{
            image: `/img/classic/classic_features/Classic-Tail-light.jpg?v=${version}`,
            title: T.t_tailLight[L],
            description: T.p_tailLight[L]
        },
           {
            image: `/img/classic/classic_thor_features/detail-thor-CARGO-BOX.jpg?v=${version}`,
            title: T.t_cargoBox[L],
            description: T.p_cargoBox[L]
        }] : []),
    ];

    const buttonCards = [
        { image: `/img/classic/classic_2+2/BLACK-SAPPHIRE.png?v=${version}`, title: "Classic 2+2" },
        { image: `/img/classic/classic_thor/classic_thor_WHITE.png?v=${version}`, title: "Classic Thor" },
    ];

    const discoverShadowTitleImg = `/img/classic/classic_text.png?v=${version}`;
    const discoverh2Span = T.h2_span_discover[L];
    const discoverh2 = T.h2_discover[L];
    const h2_discoverNext = T.h2_discoverNext[L];
    const discoverP = T.p_discover[L];
    const discoverMontageImage = `/img/classic/classic_montage.png?v=${version}`;

    const specTitles = [ T.h3_spec_dimensions[L], T.h3_spec_power[L], T.h3_spec_features[L],
    ...(currentModelIndex === 0 ? [
        T.h3_spec_additional_features[L]
    ] : []),
     T.h3_spec_body[L] ];
    const specContents = [
        ...(currentModelIndex === 0 ? [
            ["103″× 55″× 74″"],
            [...T.list_spec_power[L]],
            [...T.list_spec_features[L]],
            [...T.list_spec_additional_features[L]],
            [...T.list_spec_body[L]]
        ] : [
            ["94″× 55″× 72″, Cargo box size: 43″× 35″× 11″"],
            [...T.list_spec_power_thor[L]],
            [...T.list_spec_features_classicThor[L]],
            [...T.list_spec_body[L]]
        ])
    ]

    const shrinkGrowItems = [
        [
            { image: `/img/classic/classic_features/Classic-TOUCH-SCREEN.jpg?v=${version}`, title: T.h2_shrink_touchscreen[L], paragraph: T.p_shrink_touchscreen[L] },
            { image: `/img/classic/classic_features/Classic-TWO-USB-CONNECTIONS.jpg?v=${version}`, title: T.h2_shrink_usbPorts[L], paragraph: T.p_shrink_usbPorts[L] },
            { image: `/img/classic/classic_features/Classic-STEREO-SYSTEM.jpg?v=${version}`, title: T.h2_shrink_soundSystem[L], paragraph: T.p_shrink_soundSystem[L] },
            { image: `/img/classic/classic_features/Classic-CEILING-HANDLE.jpg?v=${version}`, title: T.h2_shrink_handles[L], paragraph: T.p_shrink_handles[L] },
            { image: `/img/classic/classic_features/Classic-Safety-belt.jpg?v=${version}`, title: T.h2_shrink_safetyBelts[L], paragraph: T.p_shrink_safetyBelts[L] },
            { image: `/img/classic/classic_features/Classic-CUP-HOLDER-b.jpg?v=${version}`, title: T.h2_shrink_cupHolders[L], paragraph: T.p_shrink_cupHolders[L] }
        ],
        [
            { image: `/img/classic/classic_features/Classic-Ball-Holder.jpg?v=${version}`, title: T.h2_shrink_golfCompartment[L], paragraph: T.p_shrink_golfCompartment[L] },
            ...(currentModelIndex === 0 ? [
                { image: `/img/classic/classic_features/Classic-Golf-bag-kit-bracket.jpg?v=${version}`, title: T.h2_shrink_golfBags[L], paragraph: T.p_shrink_golfBags[L] },
            ] : [
                { image: `/img/classic/classic_thor_features/Accelerator-Brake.jpg?v=${version}`, title: T.h2_shrink_pedals[L], paragraph: T.p_shrink_pedals[L] }
            ]),
            { image: `/img/classic/classic_features/Classic-REAR-AXLE.jpg?v=${version}`, title: T.h2_shrink_rearAxle[L], paragraph: T.p_shrink_rearAxle[L] },
            { image: `/img/classic/classic_features/Classic-lights.jpg?v=${version}`, title: T.h2_shrink_lights[L], paragraph: T.p_shrink_lights[L] },
            { image: `/img/classic/classic_features/Classic-CUP-HOLDER.jpg?v=${version}`, title: T.h2_cupHolder2[L], paragraph: T.p_shrink_cupHolder2[L] },
            { image: `/img/classic/classic_features/Classic-Tail-light.jpg?v=${version}`, title: T.h2_shrink_TailLights[L], paragraph: T.p_shrink_TailLights[L] }
        ]

    ];

    return (
        <div>
            <CartModels 
                headerBgImage="/img/classic/wooden-pathway.jpg"
                altProp="Classic Series"
                headerCartImage={`/img/classic/classic_2+2/PLAMENCO.png?v=${version}`}
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
                discoverShadowTitleImg={discoverShadowTitleImg}
                discoverh2Span={discoverh2Span}
                discoverh2={discoverh2}
                h2_discoverNext={h2_discoverNext}
                discoverP={discoverP}
                discoverMontageImage={discoverMontageImage}
                specTitles={specTitles}
                specContents={specContents} 
                shrinkGrowItems={shrinkGrowItems}    
                isClassicPage={true}        
            />
  
        </div>
    );
};

export default ClassicSeries;