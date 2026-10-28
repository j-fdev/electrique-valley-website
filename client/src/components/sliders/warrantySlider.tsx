import React, { useState, useEffect } from 'react';
import MainStyle from '../../styles/main.styles';

interface WarrantySliderProps {
    images: string[];
}

const WarrantySlider: React.FC<WarrantySliderProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const mainStyle = MainStyle();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Warranty Slide ${index + 1}`}
                    style={{
                        ...mainStyle.warrantySliderImage,
                        ...(index === currentImageIndex ? mainStyle.warrantySliderImgActive : {}),
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        transition: 'opacity 2s ease-in-out',
                        opacity: index === currentImageIndex ? 1 : 0,
                    }}
                />
            ))}
        </div>
    );
};

export default WarrantySlider;
