// Modules
import React, { useState } from 'react';

// Components
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styles
import homeSliderStyles from '../../styles/slider.style';

// Interfaces
import { i_hero_slider_props } from '../../interfaces/interfaces';

const HeroSlider: React.FC<i_hero_slider_props & { alts?: string[] }> = ({ images, alts }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear",
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        fade: true,
        afterChange: (current: number) => {
            setActiveSlide(current);
        }
    };

    return (
        <div style={homeSliderStyles.heroSlider}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img 
                            src={image} 
                            alt={alts?.[index] ?? ''} 
                            style={{ 
                                ...homeSliderStyles.heroSliderImg, 
                                transition: 'transform 3s ease-out', 
                                transform: `scale(${activeSlide === index ? 1 : 1.2})`, 
                                opacity: 1,
                                width: '100%', // Ensure full width
                                height: 'auto', // Maintain aspect ratio
                                objectFit: 'cover', // Ensure proper scaling
                            }} 
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;