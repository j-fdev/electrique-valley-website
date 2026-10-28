// Modules
import React, { useContext } from 'react';
import version from '../config/version';

// Components
import CartModels from '../components/cart.models';
import CollapsingDropdown from '../components/dropdown/collapsing.dropdown';
import ShrinkOrGrowImgSection from '../components/sections/shrinkOrGrowImg.section';
import VideoShowcase from '../components/videoShowcase/videoShowcase';

// Translations
import { translations } from '../translations/trans.luxorSeries';
import { LanguageContext } from '../translations/languageSelection';

const LuxorSeries = () => {
    const T = translations.luxorSeries;

    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [currentModelIndex, setCurrentModelIndex] = React.useState(0);

    const modelsTitle = [ 'Luxor 4', 'Luxor 4L', 'Luxor 2+2', 'Luxor 2+2L' ];
    
    const modelsImages = [
        [`/img/luxor/luxor_4/LUXOR_4-MINERAL-WHITE.png?v=${version}`,`/img/luxor/luxor_4/LUXOR_4-BLACK-SAPPHIRE.png?v=${version}`, `/img/luxor/luxor_4/LUXOR_4-ARCTIC-GRAY.png?v=${version}`, `/img/luxor/luxor_4/LUXOR_4-MEDITERRANEAN-BLUE.png?v=${version}`, `/img/luxor/luxor_4/LUXOR_4-PORTIMAO-BLUE-1.png?v=${version}`, `/img/luxor/luxor_4/LUXOR_4-SKY-BLUE.png?v=${version}`, `/img/luxor/luxor_4/LUXOR_4-LIME-GREEN.png?v=${version}`, `/img/luxor/luxor_4/LUXOR_4-FLAMENCO-RED.png?v=${version}`],
        [`/img/luxor/luxor_4L/LUXOR_4L-BLUE.png?v=${version}`, `/img/luxor/luxor_4L/LUXOR_4L-BLACK-SAPPHIRE-.png?v=${version}`, `/img/luxor/luxor_4L/LUXOR_4L-ARCTIC-GRAY-1-1.png?v=${version}`, `/img/luxor/luxor_4L/LUXOR_4L-MINERAL-WHITE.png?v=${version}`, `/img/luxor/luxor_4L/LUXOR_4L-FLAMENCO-RED.png?v=${version}`],
        [`/img/luxor/luxor_2+2/LUXOR_2+2-PORTIMAO-BLUE.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR2+2-BLACK-SAPPHIRE.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR_2+2-ARCTIC-GRAY.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR_2+2-PORTIMAO-BLUE.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR_2+2-LIMEGREEN.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR_2+2-SKY-BLUE.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR_2+2-LIMEGREEN.png?v=${version}`, `/img/luxor/luxor_2+2/LUXOR_2+2-FLAMENCO-RED.png?v=${version}`],
        [`/img/luxor/luxor_2+2L/LUXOR_2+2L-ARCTIC-GRAY.png?v=${version}`, `/img/luxor/luxor_2+2L/LUXOR_2+2L-BLACK-SAPPHIRE.png?v=${version}`, `/img/luxor/luxor_2+2L/LUXOR_2+2L-MINERAL-WHITE.png?v=${version}`, `/img/luxor/luxor_2+2L/LUXOR_2+2L-MEDITERRANEAN-BLUE.png?v=${version}`, `/img/luxor/luxor_2+2L/LUXOR_2+2L-SKY-BLUE.png?v=${version}`, `/img/luxor/luxor_2+2L/LUXOR_2+2L-FLAMENCO-RED.png?v=${version}`]
    ];
    
    const lists = [ T.luxor4_list[L], T.luxor4L_list[L], T.luxor4_list[L], T.luxor4L_list[L] ];

    const features = [
        {
            image: `img/luxor/luxorFeatures/Features-touchScreen.jpg?v=${version}`,
            title: T.t_features_screen[L],
            description: T.p_features_screen[L]
        },
         ...(currentModelIndex === 0 || currentModelIndex === 2 ? [
                { image: `img/luxor/luxorFeatures/Features-LUXOR4-TIRES.jpg?v=${version}`, title: T.t_features_tires[L], description: T.p_features_tires[L]},
            ] : [
                { image: `img/luxor/luxorFeatures/Features-luxor-SILENT-TIRES-WITH-OFFROAD-THREAD.jpg?v=${version}`, title: T.t_features_offRoad_tires[L], description: T.p_features_offRoad_tires[L]},
            ]),
            ...(currentModelIndex === 0 || currentModelIndex === 1 ? [
                { image: `img/luxor/luxorFeatures/Features-LUXOR4-SEATS.jpg?v=${version}`, title: T.t_features_seats[L], description: T.p_features_seats[L]},
            ] : [
                { image: `img/luxor/luxorFeatures/Features-LUXOR-2+2-Safety-Belts.jpg?v=${version}`, title: T.t_features_safetyBelts[L], description: T.p_features_safetyBelts[L]},
            ]),
        {
            image: `img/luxor/luxorFeatures/Features-lights.jpg?v=${version}`,
            title: T.t_features_lighting[L],
            description: T.p_features_lighting[L]
        },
        {
            image: `img/luxor/luxorFeatures/Features-ADJUSTABLE-STEERING-COLUMN.jpg?v=${version}`,
            title: T.t_features_steering[L],
            description: T.p_features_steering[L]
        },
         ...(currentModelIndex === 0 || currentModelIndex === 1 ? [
                { image: `img/luxor/luxorFeatures/Features-LUXOR4-STORAGE-TRUNK.jpg?v=${version}`, title: T.t_features_storage[L], description: T.p_features_storage[L]},
            ] : [
                { image: `img/luxor/luxorFeatures/Features-LUXOR-2+2-Storage-Compartment.jpg?v=${version}`, title: T.t_features_2_2_storage[L], description: T.p_features_2_2_storage[L]},
            ]),
        {
            image: `img/luxor/luxorFeatures/Features-SOUND-BAR.jpg?v=${version}`,
            title: T.t_features_soundBar[L],
            description: T.p_features_soundBar[L]
        },
        {
            image: `img/luxor/luxorFeatures/Features-Optional-All-Weather-Enclosure.jpg?v=${version}`,
            title: T.t_features_enclosure[L],
            description: T.p_features_enclosure[L]
        },
         ...(currentModelIndex === 2 || currentModelIndex === 3 ? [
            {
                image: `img/luxor/luxorFeatures/Features-Rear-Armrest.jpg?v=${version}`,
                title: T.t_features_rearArmrest[L],
                description: T.p_features_rearArmrest[L]
            },
            {
                image: `img/luxor/luxorFeatures/Features-LUXOR-2+2-FLIP-FLOP-REAR-SEAT.jpg?v=${version}`,
                title: T.t_features_flipRearSeats[L],
                description: T.p_features_flipRearSeats[L]
            }
        ] : [ ]),
    ];

    const buttonCards = [
        { image: `/img/luxor/luxor_4/LUXOR_4-MINERAL-WHITE.png?v=${version}`, title: "Luxor 4" },
        { image: `/img/luxor/luxor_4L/LUXOR_4L-BLUE.png?v=${version}`, title: "Luxor 4L" },
        { image: `/img/luxor/luxor_2+2/LUXOR_2+2-PORTIMAO-BLUE.png?v=${version}`, title: "Luxor 2+2" },
        { image: `/img/luxor/luxor_2+2L/LUXOR_2+2L-ARCTIC-GRAY.png?v=${version}`, title: "Luxor 2+2L" }
    ];

    const discoverShadowTitleImg = `/img/luxor/luxorFeatures/LuxorTextImg.png?v=${version}`;
    const discoverh2Span = T.h2_span_discover[L];
    const discoverh2 = T.h2_discover[L];
    const h2_discoverNext = T.h2_discoverNext[L];
    const discoverP = T.p_discover[L];
    const discoverMontageImage = `/img/luxor/luxorFeatures/cart montage.png?v=${version}`

    const specTitles = [ T.h3_spec_dimensions[L], T.h3_spec_power[L], T.h3_spec_features[L] ];
    const specContents = [
        ["Luxor 4: 118.1″× 55.8″× 83.1″", "Luxor 4L: 114.6″× 55.8″× 79.5″", "Luxor 2+2: 121.3″× 55.8″× 80.5″", "Luxor 2+2L: 124.8″× 55.8″× 84.1″"],
        [...T.list_spec_power[L]],
        [...T.list_spec_features[L]]
    ]

    const shrinkGrowItems = [
        [
            { image: `img/main/accessories/RoofHandles.jpg?v=${version}`, title: T.h2_shrink_handles[L], paragraph: T.p_shrink_handles[L] },
            { image: `img/main/accessories/CupHolders.jpg?v=${version}`, title: T.h2_shrink_cupHolders[L], paragraph: T.p_shrink_cupHolders[L] },
            { image: `img/main/accessories/DashStorage.jpg?v=${version}`, title: T.h2_shrink_dashStorage[L], paragraph: T.p_shrink_dashStorage[L] },
            { image: `img/main/accessories/Storage.jpg?v=${version}`, title: T.h2_shrink_storage[L], paragraph: T.p_shrink_storage[L] },
            { image: `img/main/accessories/UsbPorts.jpg?v=${version}`, title: T.h2_shrink_usbPorts[L], paragraph: T.p_shrink_usbPorts[L] }
        ],
        [
            { image: `img/main/accessories/BallsCompartiment.jpg?v=${version}`, title: T.h2_shrink_golfCompartment[L], paragraph: T.p_shrink_golfCompartment[L] },
            { image: `img/main/accessories/MirrorFlashers.jpg?v=${version}`, title: T.h2_shrink_mirrorFlashers[L], paragraph: T.p_shrink_mirrorFlashers[L] },
            { image: `img/main/accessories/ChargerPlug.jpg?v=${version}`, title: T.h2_shrink_chargerPlug[L], paragraph: T.p_shrink_chargerPlug[L] },
            { image: `img/luxor/luxorFeatures/Features-SOUND-BAR.jpg?v=${version}`, title: T.h2_shrink_soundBar[L], paragraph: T.p_shrink_soundBar[L] },
            { image: `img/main/accessories/GolfBags.jpg?v=${version}`, title: T.h2_shrink_golfBags[L], paragraph: T.p_shrink_golfBags[L] }
        ]

    ];

    // const videos = [
    //     {
    //         title: "Luxor 4 Overview",
    //         description: "An in-depth look at the features and benefits of the Luxor 4 model.",
    //         videoUrl: "https://www.youtube.com/embed/example1"
    //     },
    //     {
    //         title: "Luxor 4L Performance",
    //         description: "See the Luxor 4L in action and discover its performance capabilities.",
    //         videoUrl: "https://www.youtube.com/embed/example2"
    //     },
    //     {
    //         title: "Luxor 2+2 Comfort",
    //         description: "Experience the comfort and luxury of the Luxor 2+2 model.",
    //         videoUrl: "https://www.youtube.com/embed/example3"
    //     }
    // ];

    return (
        <div>
            <CartModels 
                headerBgImage="/img/luxor/pictire-golf-landscape-with-green-grass-stream.jpg"
                altProp="Luxor Series"
                headerCartImage="/img/luxor/luxor_4L/LUXOR_4L-BLUE.png"
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
                discoverMontageImage={discoverMontageImage} 
                h2_discoverNext={h2_discoverNext}
                discoverP={discoverP}
                specTitles={specTitles}
                specContents={specContents} 
                shrinkGrowItems={shrinkGrowItems} 
                isLuxorPage={true}           
            />
  
        </div>
    );
};

export default LuxorSeries;