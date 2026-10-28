

// Modules
import React from 'react';

// Components
import Slider from 'react-slick';
import ModelCard from '../cards/modelCardSlider';

// Interfaces
import {i_models_slider} from '../../interfaces/interfaces';

const ModelSlider: React.FC<{ models: i_models_slider[] }> = ({ models }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,               // Increased speed
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        cssEase: "ease-out",       // Changed easing
        swipeToSlide: true,        // Added swipe functionality
        initialSlide: 0,           // Set initial slide
        useCSS: true,              // Ensure CSS transitions are used
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Slider {...settings}>
                {models.map((model, index) => (
                    <ModelCard key={index} image={model.image} title={model.title} link={model.link} />
                ))}
            </Slider>
        </div>
    );
};

export default ModelSlider;
