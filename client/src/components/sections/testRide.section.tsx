// Modules
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import version from '../../config/version';

// Styles
import MainStyle from '../../styles/main.styles';

// Components
import Button from '../../components/button/mainButton';

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Translations
import { translations } from '../../translations/trans.home';
import { LanguageContext } from '../../translations/languageSelection';

const TestRideSection: React.FC = () => {
    const isMobile = useWindowSize();
    const mainStyle = MainStyle();
    const location = useLocation();
    const [cartImage, setCartImage] = useState(`/img/luxor/luxor_2+2L/LUXOR_2+2L-SKY-BLUE.png?v=${version}`);
    const [cartStyle, setCartStyle] = useState({...mainStyle.testRideImageLuxor, width: isMobile ? '400px' : '800px', height: 'auto', right: isMobile ? '200px' : '150px', top: '0px' });

    const T = translations.home; 
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    useEffect(() => {
        if (location.pathname.includes('luxorSeries')) {
            setCartImage(`/img/luxor/luxor_2+2L/LUXOR_2+2L-SKY-BLUE.png?v=${version}`); 
            setCartStyle({...mainStyle.testRideImageLuxor, width: isMobile ? '400px' : '800px', height: 'auto', right: isMobile ? '200px' : '150px', top: '0px' });     
        } else if (location.pathname.includes('thorSeries')) {
            setCartImage(`/img/thor/Thor-GREEN.png?v=${version}`);
            setCartStyle( {...mainStyle.testRideImageLuxor, width: isMobile ? '300px' : '700px', height: 'auto', right: isMobile ? '100px' : '150px', top: '50px' });
        } else if (location.pathname.includes('diabloSeries')) {
            setCartImage(`/img/diablo/diablo2.png?v=${version}`);
            // setCartStyle( {...mainStyle.testRideImageLuxor, width: isMobile ? '200px' : '400px', height: 'auto', right: isMobile ? '0' : '300px', top: isMobile ? '20px' : '50px' });
        } else if (location.pathname.includes('classicSeries')) {
            setCartImage(`/img/classic/classic_2+2/sky-BLUE.png?v=${version}`);
            setCartStyle( {...mainStyle.testRideImageLuxor, width: isMobile ? '300px' : '700px', height: 'auto', right: isMobile ? '100px' : '150px', top: '50px' });
        } else if (location.pathname.includes('evolutionSeries')) {
            setCartImage(`/img/d-max/XT4/Evolution4L-color-PORTIMAO-BLUE.png?v=${version}`);
            setCartStyle( {...mainStyle.testRideImageLuxor, width: isMobile ? '300px' : '700px', height: 'auto', right: isMobile ? '100px' : '150px', top: '50px' });
        } else if (location.pathname.includes('eliteSeries')) {
            setCartImage(`/img/elite/Elite_4/Elite_4L_black_nobg.png?v=${version}`);
            setCartStyle( {...mainStyle.testRideImageLuxor, width: isMobile ? '300px' : '1000px', height: 'auto', right: isMobile ? '100px' : '100px', top: '0px' });
        }
    }, [location.pathname]);

    return (
        <div style={mainStyle.section}>
            <div style={mainStyle.testRideContainer}>
                <div style={mainStyle.testRideContent}>
                    <h2 style={{...mainStyle.title, textAlign: isMobile ? 'center' : 'left' }}>{T.title_test_ride[L]}</h2>
                    <p style={mainStyle.paragraph}>{T.p_test_ride[L]}</p>
                    <Link to="/contact">
                        <Button customStyle={{...mainStyle.blackBtn, alignSelf: isMobile ? 'center' : 'flex-start' }}>
                        {T.btn_test_ride[L]}
                        </Button>
                    </Link>
                </div>
                <div style={{ paddingTop: isMobile ? '10px' : '100px' }}>
                    <div>
                        <img style={mainStyle.testRideImageCamping} src={`/img/main/camping.jpg?v=${version}`} alt="camping image" />
                    </div>
                    <div style={{ flex: 1.5 }}>
                        <img style={cartStyle} src={cartImage} alt="Cart Image" />
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default TestRideSection;

