// Modules
import { useContext, useEffect, useState } from 'react';
import version from '../config/version';

// Config
import { apiCall } from '../config/api.config';

// Components
import HeroSlider from '../components/sliders/heroSlider';
import ModelSlider from '../components/sliders/modelsSlider';
import WarrantySlider from '../components/sliders/warrantySlider';
import Button from '../components/button/mainButton';
import FeaturesCards from '../components/cards/featuresCards';
import BecomeDealer from '../components/sections/becomeDealer.section';
import TestRideSection from '../components/sections/testRide.section';
import SignupSection from '../components/sections/signup.section';
import HorizontalScroll from '../components/cards/horizontalScroll';
import CarPlaySection from '../components/sections/carplay.section';
import VideoShowcase from '../components/videoShowcase/videoShowcase';
import { i_modelCardProps } from '../interfaces/interfaces';


// Hooks
import { useWindowSize } from '../hooks/useWindowSize';

// Interfaces
import { i_videoCapsule } from '../interfaces/interfaces';

// Styles
import HomeStyles from '../styles/home.style';
import MainStyle from '../styles/main.styles';

// Translations
import { translations } from '../translations/trans.home';
import { LanguageContext } from '../translations/languageSelection';
import { pathFor } from '../config/routes';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const isMobile = useWindowSize();
    const homeStyles = HomeStyles();
    const mainStyle = MainStyle();
	const T = translations.home; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    const [videoCapsules, setVideoCapsules] = useState<i_videoCapsule[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const heroSliderImages = [ `/img/home/dmax_banner.jpg?v=${version}`, `/img/home/Luxor_4+2_banner(En).jpg?v=${version}`, `/img/home/New_LUXOR_Series_banner(En).jpg?v=${version}`, `/img/home/classic_series.jpg?v=${version}`, `/img/home/thor_series.jpg?v=${version}`];
    const heroSliderAlts = L === 'fr'
        ? ['Voiturette D-MAX', 'Luxor 4+2', 'Nouvelle série Luxor', 'Série Classic', 'Série Thor']
        : ['D-MAX cart', 'Luxor 4+2', 'New Luxor series', 'Classic series', 'Thor series'];
    const warrantySliderImages = [`/img/home/D-MAX_XT4.jpg?v=${version}`, `/img/home/Elite-Plus_2+2.jpg?v=${version}`, `/img/home/D-MAX-XT4.jpg?v=${version}`];

    const cartModels = [
        { image: `/img/d-max/XT4/Evolution4L-color-BLACK-SAPPHIRE.png?v=${version}`, title: T.title_evolution_card[L], link: pathFor('dmax', L), t1: T.t1_evolution_card[L], p1: T.p1_evolution_card[L], t2: T.t2_evolution_card[L], p2: T.p2_evolution_card[L], t3: T.t3_evolution_card[L], p3: T.p3_evolution_card[L], t4: T.t4_evolution_card[L], p4: T.p4_evolution_card[L] },
        { image: `/img/luxor/luxor_4L/LUXOR_4L-ARCTIC-GRAY-1-1.png?v=${version}`, title: T.title_luxor_card[L], link: pathFor('luxor', L), t1: T.t1_luxor_card[L], p1: T.p1_luxor_card[L], t2: T.t2_luxor_card[L], p2: T.p2_luxor_card[L], t3: T.t3_luxor_card[L], p3: T.p3_luxor_card[L], t4: T.t4_luxor_card[L], p4: T.p4_luxor_card[L] },
        { image: `/img/classic/classic_2+2/PLAMENCO.png?v=${version}`, title: T.title_classic_card[L], link: pathFor('classic', L), t1: T.t1_classic_card[L], p1: T.p1_classic_card[L], t2: T.t2_classic_card[L], p2: T.p2_classic_card[L], t3: T.t3_classic_card[L], p3: T.p3_classic_card[L], t4: T.t4_classic_card[L], p4: T.p4_classic_card[L] },
        { image: `/img/thor/Thor-GREEN-shadow.png?v=${version}`, title: T.title_thor_card[L], link: pathFor('thor', L), t1: T.t1_thor_card[L], p1: T.p1_thor_card[L], t2: T.t2_thor_card[L], p2: T.p2_thor_card[L], t3: T.t3_thor_card[L], p3: T.p3_thor_card[L], t4: T.t4_thor_card[L], p4: T.p4_thor_card[L] },
        // Elite hidden for now
        // { image: `/img/elite/Elite_4/Elite_4_blue_nobg.png?v=${version}`, title: T.title_elite_card[L], link: pathFor('elite', L), t1: T.t1_elite_card[L], p1: T.p1_elite_card[L], t2: T.t2_elite_card[L], p2: T.p2_elite_card[L], t3: T.t3_elite_card[L], p3: T.p3_elite_card[L], t4: T.t4_elite_card[L], p4: T.p4_elite_card[L] },
    ];

      
	const svgIcon1 = (
		<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 512 512"  xmlSpace="preserve">
		  <g>
			<path d="M256.8,160c-25.7,0-49.8,10-67.9,28.1c-18.1,18.1-28.1,42.2-28.1,67.9s10,49.7,28.1,67.9C207,342,231.2,352,256.8,352 c25.7,0,49.8-10,67.9-28.1c18.1-18.1,28.1-42.2,28.1-67.9s-10-49.7-28.1-67.9C306.6,170,282.5,160,256.8,160z M256.8,336 c-44.3,0-80-35.9-80-80c0-44.1,35.7-80,80-80c44.3,0,80,35.9,80,80C336.8,300.1,301.1,336,256.8,336z"></path>
			<path d="M424.5,216h-15.2c-12.4,0-22.8-10.4-22.8-23.2c0-6.4,2.7-12.1,7.5-16.4l9.8-9.6c9.7-9.6,9.7-25.2,0-34.9l-22.3-22.1 c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.7,7.7-17.2,7.7c-12.8,0-23.7-10.4-23.7-22.7V89.1 c0-13.5-10.5-25.1-24-25.1h-30.4C228,64,217,75.5,217,89.1v15.2c0,12.3-10.6,22.7-23.4,22.7c-6.4,0-12.2-2.7-16.6-7.4l-9.7-9.6 c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.2,7.8,16.7 c0,12.8-10.4,23.2-22.8,23.2H89.2C75.5,216,64,227.2,64,240.8V256v15.2c0,13.5,11.5,24.8,25.2,24.8h15.2 c12.4,0,22.8,10.4,22.8,23.2c0,6.4-2.8,12.3-7.8,16.8l-9.4,9.2c-9.6,9.6-9.6,25.2,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7 c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.1-7.4,16.5-7.4c12.8,0,23.4,10.4,23.4,22.7v15.2c0,13.5,11,25.1,24.7,25.1h30.4 c13.6,0,24.9-11.5,24.9-25.1v-15.2c0-12.3,10.5-22.7,23.3-22.7c6.4,0,12.3,2.8,16.9,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7 c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.4-7.5-16.7c0-12.8,10.4-23.6,22.8-23.6h15.2 c13.6,0,23.3-10.3,23.3-23.9V256v-15.2C447.8,227.2,438.1,216,424.5,216z M432,256v15.1c0,4.2-2.3,7.9-7.3,7.9h-15.2 c-10.3,0-20.1,4.4-27.5,12c-7.3,7.5-11.3,17.4-11.3,27.8c0,10.8,4.4,20.8,12.5,28.2l9.5,9.4c3.3,3.4,3.3,9,0,12.3l-22.3,22.2 c-1.6,1.5-3.9,2.4-6.3,2.4c-2.4,0-4.8-0.9-6.3-2.4l-9.1-9.1c-7.7-8.1-17.8-12.6-28.5-12.6c-10.4,0-20,4-27.5,11.2 c-7.6,7.4-11.6,17.1-11.6,27.5v15.2c0,4.9-4.3,9.1-8.9,9.1h-30.4c-4.6,0-8.7-4.2-8.7-9.1v-15.2c0-10.3-4.1-20.1-11.7-27.5 c-7.5-7.2-17.3-11.2-27.6-11.2c-10.6,0-20.8,4.5-28.1,12.4l-9.3,9.3c-1.6,1.5-3.9,2.4-6.3,2.4c-2.4,0-4.8-0.8-6.1-2.2l-0.1-0.1 l-0.1-0.1l-22.3-22.2c-3.3-3.3-3.3-8.8,0-12.2l9.1-9c8.2-7.6,12.7-17.7,12.7-28.5c0-10.4-4-19.9-11.3-27.4 c-7.4-7.6-17.2-11.5-27.5-11.5H89.2c-5,0-9.2-4.3-9.2-8.8V256v-15.2c0-4.5,4.2-8.8,9.2-8.8h15.2c10.3,0,20.1-3.9,27.5-11.5 c7.3-7.5,11.3-17.2,11.3-27.5c0-10.8-4.5-20.9-12.7-28.4l-9.2-9.1c-2.2-2.2-2.5-4.7-2.5-6.1c0-1.3,0.3-3.9,2.5-6.1l22.2-22.1 c1.6-1.5,3.9-2.4,6.3-2.4c2.4,0,4.8,0.8,6.1,2.2l0.1,0.1l0.1,0.1l9.4,9.4c7.4,8,17.4,12.4,28.1,12.4c10.4,0,20.1-4,27.6-11.2 c7.6-7.4,11.8-17.1,11.8-27.5V89.1c0-4.9,4-9.1,8.5-9.1H272c4.5,0,8,4.2,8,9.1v15.2c0,10.3,4.4,20.1,12,27.5 c7.5,7.2,17.4,11.2,27.8,11.2c10.8,0,21-4.5,28.6-12.6l9.1-9.1c1.6-1.5,3.9-2.4,6.3-2.4c2.4,0,4.8,0.9,6.3,2.3l22.3,22.1 c1.6,1.6,2.6,3.8,2.6,6.1c0,2.3-0.9,4.5-2.5,6.1l-9.5,9.4c-8,7.4-12.5,17.4-12.5,28.2c0,10.4,4,19.9,11.3,27.4 c7.4,7.6,17.2,11.5,27.5,11.5h15.2c5.4,0,7.4,5,7.5,9V256z"></path>
		  </g>
		</svg>
	  );
	const svgIcon2 = (
		<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"  id="Layer_1" viewBox="0 0 200 200" ><title></title>
			<path d="M166.73,40.32a146.82,146.82,0,0,1-30.5-7.5c-12-4.5-22.5-10-28-17l-.5-.5-.5-.5c-.5,0-.5-.5-1-.5s-.5-.5-1-.5-.5-.5-1-.5-.5-.5-1-.5h-6c-.5,0-.5,0-1,.5-.5,0-.5,0-1,.5-.5,0-.5.5-1,.5s-.5.5-1,.5l-.5.5-.5.5c-6,7-16.5,12.5-28,17a176.56,176.56,0,0,1-30.5,7.5,10.23,10.23,0,0,0-9,10c0,25,1.5,53,11,77.5,6.5,16.5,16.5,31.5,30.5,42.5a66.19,66.19,0,0,0,16,10c6.5,3.5,14.5,9,22,6,19-7,37.5-20.5,49-37.5a108.89,108.89,0,0,0,11-21.5c9.5-24.5,11-52.5,11-77.5.5-4.5-3.5-8.5-8.5-9.5Zm-20.5,80.5c-7.5,19.5-21,36-45.5,46-24.5-10-38-26.5-45.5-46-7-18.5-9-40-9.5-62a170.71,170.71,0,0,0,26-7c10-3.5,20.5-8.5,29-15.5,8.5,7,19,12,29,15.5,9,3.5,18.5,5.5,26,7-.5,22-2.5,43.5-9.5,62Zm-49.5-14-20-14.5c-4.5-3-10.5-2.5-14,2-3,4.5-2.5,10.5,2,14l27.5,20c5.5,4,11,1.5,15-3.5,11-13.5,22.5-27,33.5-40.5,3.5-4.5,3-10.5-1.5-14s-10.5-3-14,1.5l-28.5,35Z"></path>
		</svg>
	);
	const svgIcon3 = (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ width: '75px', height: '75px' }}>
			<path d="M196.48 260.023l92.626-103.333L143.125 0v206.33l-86.111-86.111-31.406 31.405 108.061 108.399L25.608 368.422l31.406 31.405 86.111-86.111L145.84 512l148.552-148.644-97.912-103.333zm40.86-102.996l-49.977 49.978-.338-100.295 50.315 50.317zM187.363 313.04l49.977 49.978-50.315 50.316.338-100.294z"></path>
		</svg>
	);
	const svgIcon4 = (
		<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  id="Layer_1" viewBox="0 0 128 128"  xmlSpace="preserve">
			<path d="M112.005,50.192h-96c-0.778,0-1.485-0.451-1.813-1.157s-0.217-1.538,0.284-2.132L37.5,19.595  c0.38-0.451,0.939-0.711,1.529-0.711h49.957c0.59,0,1.149,0.26,1.529,0.711l23.019,27.308c0.501,0.595,0.612,1.427,0.284,2.132  S112.783,50.192,112.005,50.192z M20.308,46.192h87.396L88.057,22.884H39.959L20.308,46.192z"></path><polygon points="64.005,108.299 14.475,49.48 17.535,46.904 64.005,102.088 110.475,46.904 113.535,49.48 "></polygon><path d="M64.005,107.193L64.005,107.193c-0.849,0-1.604-0.535-1.886-1.335L42.023,48.857c-0.221-0.625-0.117-1.317,0.275-1.851  l20.096-27.308c0.752-1.024,2.467-1.024,3.221,0l20.1,27.308c0.393,0.533,0.496,1.226,0.275,1.851l-20.1,57.001  C65.609,106.658,64.854,107.193,64.005,107.193z M46.147,48.525l17.857,50.654l17.861-50.654L64.005,24.258L46.147,48.525z"></path><rect height="4" transform="matrix(0.1759 0.9844 -0.9844 0.1759 68.1737 -12.3602)" width="27.74" x="27.599" y="32.538"></rect><rect height="27.741" transform="matrix(0.9844 0.176 -0.176 0.9844 7.431 -14.695)" width="4" x="84.545" y="20.668"></rect>
		</svg>
	);
	const svgIcon5 = (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g data-name="Sofa Chair" id="Sofa_Chair-4">
			<path d="M38.61,12.42H25.39A11.76,11.76,0,0,0,13.64,24.17v5.35a7.19,7.19,0,0,0-3.52,13v6.28a2.74,2.74,0,0,0,2.74,2.74H51.14a2.74,2.74,0,0,0,2.74-2.74V42.56a7.19,7.19,0,0,0-3.52-13V24.17A11.76,11.76,0,0,0,38.61,12.42Zm-13.22,2H38.61a9.76,9.76,0,0,1,9.75,9.75v5.46a7.19,7.19,0,0,0-5.81,6.81,4.5,4.5,0,0,0-2.48-.75H23.93a4.5,4.5,0,0,0-2.48.75,7.19,7.19,0,0,0-5.81-6.81V24.17A9.76,9.76,0,0,1,25.39,14.42ZM21.46,40.15a2.47,2.47,0,0,1,2.47-2.46H40.07a2.47,2.47,0,0,1,2.47,2.46v2.48H21.46Zm33.47-3.46a5.22,5.22,0,0,1-2.56,4.47,1,1,0,0,0-.49.86v6.82a.74.74,0,0,1-.74.74H12.86a.74.74,0,0,1-.74-.74V42a1,1,0,0,0-.49-.86,5.19,5.19,0,1,1,7.83-4.47v5.94H18.27a1,1,0,0,0,0,2H45.72a1,1,0,0,0,0-2H44.54V36.69a5.2,5.2,0,1,1,10.39,0Z"></path><path d="M24.63,23.43a2.81,2.81,0,1,0-2.81-2.81A2.81,2.81,0,0,0,24.63,23.43Zm0-3.62a.81.81,0,0,1,0,1.62.81.81,0,0,1,0-1.62Z"></path><path d="M39.37,23.43a2.81,2.81,0,1,0-2.8-2.81A2.81,2.81,0,0,0,39.37,23.43Zm0-3.62a.81.81,0,1,1-.8.81A.81.81,0,0,1,39.37,19.81Z"></path><path d="M24.63,31.39a2.81,2.81,0,1,0-2.81-2.81A2.81,2.81,0,0,0,24.63,31.39Zm0-3.61a.81.81,0,1,1-.81.8A.8.8,0,0,1,24.63,27.78Z"></path><path d="M39.37,31.39a2.81,2.81,0,1,0-2.8-2.81A2.81,2.81,0,0,0,39.37,31.39Zm0-3.61a.81.81,0,1,1-.8.8A.8.8,0,0,1,39.37,27.78Z"></path><path d="M14.27,33.36a3.33,3.33,0,1,0,3.32,3.33A3.34,3.34,0,0,0,14.27,33.36Zm0,4.65a1.33,1.33,0,1,1,1.32-1.32A1.33,1.33,0,0,1,14.27,38Z"></path><path d="M46.41,36.69a3.33,3.33,0,1,0,3.32-3.33A3.32,3.32,0,0,0,46.41,36.69Zm4.65,0a1.33,1.33,0,1,1-1.33-1.33A1.33,1.33,0,0,1,51.06,36.69Z"></path></g>
		</svg>
	);
	const svgIcon6 = (
		<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" id="Layer_1" viewBox="0 0 24 24"><title></title>
			<path d="M20,14a5,5,0,0,0-2-4V7.38L15.86,6.31,15.78,6H17V4H15.28l-.5-2H5.22l-.5,2H3V6H4.22l-.08.31L2,7.38V14H4v1H6V14h4a5,5,0,0,0,7.75,4.17l3.54,3.54,1.41-1.41-3.54-3.54A5,5,0,0,0,20,14ZM6.78,4h6.44l.5,2H6.28ZM11,11V10H9v2H4V8.62L5.24,8h9.53L16,8.62V9.1A5,5,0,0,0,11,11Zm1,3a3,3,0,1,1,3,3A3,3,0,0,1,12,14Z"></path><rect x="5" y="9"></rect>
		</svg>
	);
    useEffect(() => {
            const getVideoCapsules = async () => {
                try {
                    setIsLoading(true);
                    
                    const videoData = await apiCall('/api/videoCapsules', {
                        method: 'GET',
                    });
    
                    if (videoData.type === 'Success') {
                        const transformed: i_videoCapsule[] = videoData.data.map((video: any) => ({
                            id: video.id,
                            title: {
                                en: video.title.en || video.title,
                                fr: video.title.fr || video.title
                            },
                            description: video.description ? {
                                en: video.description.en || null,
                                fr: video.description.fr || null
                            } : undefined,
                            path: video?.path ,
                            videoUrl: video.url
                        }));
                        setVideoCapsules(transformed);
                    } else {
                        setError(videoData.message || 'Failed to load videos');
                    }
                } catch (err) {
                    console.error('Error fetching videos:', err);
                    setError('Failed to load videos. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            };
            console.log("Video capsules: ", videoCapsules);
            getVideoCapsules();
        }, []);
   
    // Small labels shown above the section titles
    const EB = {
        series: { en: 'Our lineup', fr: 'Nos modèles' },
        about: { en: 'Who we are', fr: 'Qui sommes-nous' },
        paint: { en: 'Finish', fr: 'Finition' },
        features: { en: 'Why choose us', fr: 'Pourquoi nous choisir' },
        warranty: { en: 'Peace of mind', fr: 'Tranquillité d’esprit' },
        videos: { en: 'Watch', fr: 'À voir' },
    };

    if (!languageContext) return null;

    return (
        <div style={{ overflowX: 'clip' }}>
            {/* Hero */}
            <div className="ev-hero" style={homeStyles.heroWrapper}>
                {/* The banners have their text inside the images, so the page title is given to search engines and screen readers here */}
                <h1 className="ev-sr-only">{L === 'fr' ? 'Electrique Valley : voiturettes de golf et véhicules utilitaires électriques à Salaberry-de-Valleyfield' : 'Electrique Valley: electric golf carts and utility vehicles in Salaberry-de-Valleyfield'}</h1>
                <HeroSlider images={heroSliderImages} alts={heroSliderAlts} language={L} />
                <div className="ev-hero__fade" />
            </div>

            {/* Series section */}
            <section className="ev-section" style={{ paddingTop: isMobile ? '2rem' : '3rem' }}>
                <div className="ev-container">
                    <HorizontalScroll
                        models={cartModels}
                        eyebrow={EB.series[L]}
                        title={T.title_our_series[L]}
                    />
                </div>
            </section>

            {/* About section */}
            <section className="ev-section" style={{ paddingTop: 0 }}>
                <div className="ev-container ev-about">
                    <img className="ev-about__logo ev-reveal ev-reveal--zoom" src={`/img/main/ElectriqueValley-emblem-metal.png?v=${version}`} alt="Electrique Valley" loading="lazy" />
                    <div className="ev-reveal ev-reveal--right">
                        <span className="ev-eyebrow">{EB.about[L]}</span>
                        <h2 className="ev-section-title ev-section-title--left">{T.about_title[L]}</h2>
                        <p style={{ marginTop: '1.5rem' }}>{T.p_about[L]}</p>
                    </div>
                </div>
            </section>

            {/* Paint section */}
            <section className="ev-section" style={{ background: '#fff' }}>
                <div className="ev-container" style={{ textAlign: 'center' }}>
                    <div className="ev-reveal">
                        <span className="ev-eyebrow">{EB.paint[L]}</span>
                        <h2 className="ev-section-title">{T.title_paint1[L]} {T.title_paint2[L]}</h2>
                        <p style={{ maxWidth: '90ch', margin: '1.5rem auto 0', color: 'var(--ev-muted)', fontSize: '0.95rem' }}>{T.p_paint[L]}</p>
                    </div>
                    <div className="ev-swatches ev-stagger">
                        {[1, 2, 3, 4].map((n) => (
                            <img key={n} className="ev-swatch" src={`/img/home/color${n}.jpg?v=${version}`} alt="" loading="lazy" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features section */}
            <div style={homeStyles.featuresContainer}>
                <div style={homeStyles.bgImage}>
                    <div style={{ ...homeStyles.bgImageOverlay, background: 'linear-gradient(180deg, rgba(10, 26, 43, 0.88) 0%, rgba(10, 26, 43, 0.72) 50%, rgba(10, 26, 43, 0.9) 100%)' }}></div>
                    <div style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>
                        <div className="ev-reveal">
                            <span className="ev-eyebrow ev-eyebrow--light">{EB.features[L]}</span>
                            <h2 className="ev-section-title" style={{ color: 'white' }}>{T.title_features[L]}</h2>
                        </div>
                        <div className="ev-features-grid ev-stagger">
                            <FeaturesCards icon={svgIcon1} title={T.card1_title_features[L]} description={T.card1_description_features[L]} />
                            <FeaturesCards icon={svgIcon2} title={T.card2_title_features[L]} description={T.card2_description_features[L]} />
                            <FeaturesCards icon={svgIcon3} title={T.card3_title_features[L]} description={T.card3_description_features[L]} />
                            <FeaturesCards icon={svgIcon4} title={T.card4_title_features[L]} description={T.card4_description_features[L]} />
                            <FeaturesCards icon={svgIcon5} title={T.card5_title_features[L]} description={T.card5_description_features[L]} />
                            <FeaturesCards icon={svgIcon6} title={T.card6_title_features[L]} description={T.card6_description_features[L]} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Warranty section: dark band, big "1 AN" figure, photo carousel bleeding to the edge */}
            <section className="ev-section ev-warranty">
                <div className="ev-warranty__glow" aria-hidden="true" />
                <div className="ev-container ev-warranty__grid">
                    <div className="ev-warranty__text ev-reveal ev-reveal--left">
                        <span className="ev-eyebrow ev-eyebrow--light">{EB.warranty[L]}</span>
                        <h2 className="ev-warranty__figure">
                            <span className="ev-sr-only">{T.title_warranty[L]}</span>
                            <span className="ev-warranty__num" aria-hidden="true">1</span>
                            <span className="ev-warranty__unit" aria-hidden="true">
                                {T.unit_warranty[L]}
                                <small>{T.word_warranty[L]}</small>
                            </span>
                        </h2>
                        <p className="ev-warranty__lead">{T.subtitle_warranty[L]}</p>
                        <ul className="ev-warranty__points">
                            {T.points_warranty[L].map((point) => <li key={point}>{point}</li>)}
                        </ul>
                        <p className="ev-warranty__fine">{T.fine_warranty[L]}</p>
                    </div>
                    <div className="ev-warranty__media ev-reveal ev-reveal--right">
                        <WarrantySlider
                            images={warrantySliderImages}
                            alts={T.slides_warranty[L]}
                            slideLabel={(n, total) => T.slide_label_warranty[L].replace("{n}", String(n)).replace("{total}", String(total))}
                        />
                    </div>
                </div>
            </section>

            {/* Lithium battery section: the band unrolls from the right (the section is the scroll trigger,
                because a fully clipped element never counts as "on screen") */}
            <section className="ev-section ev-reveal ev-reveal--unroll">
                <div className="ev-battery">
                    <div className="ev-battery__content">
                        <h2 className="ev-battery__title">{T.title_lithium_battery[L]}</h2>
                        <span className="ev-battery__badge">{T.title_lithium_battery_span[L]}</span>
                        <ul className="ev-battery__list">
                            <li>{T.li1_lithium_battery[L]}</li>
                            <li>{T.li2_lithium_battery[L]}</li>
                        </ul>
                    </div>
                    <img className="ev-battery__img" src={`/img/home/lithium_battery_110ah.webp?v=${version}`} alt={T.title_lithium_battery[L]} loading="lazy" />
                </div>
            </section>

            {/* Become a Dealer section */}
            <BecomeDealer />

            {/* Video Showcase section */}
            <section className="ev-section" style={{ background: '#fff' }}>
                <div className="ev-container" style={{ textAlign: 'center' }}>
                    <div className="ev-reveal">
                        <span className="ev-eyebrow">{EB.videos[L]}</span>
                        <h2 className="ev-section-title">{T.h2_videoShowcase[L]}</h2>
                    </div>
                    <div className="ev-videos ev-stagger">
                        {/* Two on the home page: a third one sat alone on its own row on most screens */}
                        {videoCapsules.slice(0, 2).map((video, index) => (
                            <div key={index} className="ev-video">
                                <div className="ev-video__frame">
                                    <video controls preload="metadata" onError={(e) => console.error('Video error:', e.currentTarget.error)}>
                                    <source src={video.videoUrl} type="video/webm" />
                                    Your browser does not support the video tag.
                                    </video>
                                </div>
                                <h3 className="ev-video__title">{video.title[L]}</h3>
                            </div>
                        ))}
                    </div>
                    <Link to={pathFor('videos', L)} className="ev-btn">
                        {T.btn_videoShowcase[L]}
                        <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </Link>
                </div>
            </section>

            {/* Test ride section */}
            <TestRideSection />

            {/* SignUp section */}
            <SignupSection />
        </div>
    );
};

export default Home;
