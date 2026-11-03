// Modules
import React, { useState } from 'react';

// Components
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styles
import homeSliderStyles from '../../styles/slider.style';

// Interfaces
import { i_hero_slider_props } from '../../interfaces/interfaces';

/** Round arrow buttons on each side of the hero. react-slick passes onClick; its own className is replaced so the default arrows (placed off screen) are not used. */
const HeroArrow: React.FC<CustomArrowProps & { direction: 'prev' | 'next'; label: string }> = ({ onClick, direction, label }) => (
    <button type="button" className={`ev-hero__arrow ev-hero__arrow--${direction}`} onClick={onClick} aria-label={label}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
        </svg>
    </button>
);

const HeroSlider: React.FC<i_hero_slider_props & { alts?: string[]; language?: 'fr' | 'en' }> = ({ images, alts, language = 'fr' }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'ease-in-out',
        autoplay: true,
        autoplaySpeed: 4000,
        // Keep changing even when the mouse rests on the hero (it covers most of the screen)
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: true,
        prevArrow: <HeroArrow direction="prev" label={language === 'fr' ? 'Image précédente' : 'Previous image'} />,
        nextArrow: <HeroArrow direction="next" label={language === 'fr' ? 'Image suivante' : 'Next image'} />,
        fade: true,
        beforeChange: (_current: number, next: number) => {
            setActiveSlide(next);
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
                                transform: `scale(${activeSlide === index ? 1 : 1.08})`,
                                opacity: 1,
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
