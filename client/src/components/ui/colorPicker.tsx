

// Modules
import React, { useState } from 'react';

interface i_colorPicker_props {
    images: string[];
    setSelectedColorIndex: (colorIndex: number) => void;
};

const ColorPicker: React.FC<i_colorPicker_props> = ({ images, setSelectedColorIndex}) => {

    const [ isHovered, setIsHovered ] = useState<number | null>(null);

    const handleClick = (colorIndex: number) => {
        setSelectedColorIndex(colorIndex);
    };

    const buttonStyle = (index: number) => ({
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        outline: 'none',
        boxShadow: isHovered === index ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
        margin: '5px',
    })

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {images.map((image, index) => (
                <button key={index} style={buttonStyle(index)} onClick={() => handleClick(index)} onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(null)} >
                    <img src={image} alt={`Color Picker ${index}`} style={{ borderRadius: '50%', width: '100%', height: '100%' }} />
                </button>
            ))}
        </div>
    )
};

export default ColorPicker;