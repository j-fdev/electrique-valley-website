// Modules
import React from 'react';

interface i_colorPicker_props {
    images: string[];
    setSelectedColorIndex: (colorIndex: number) => void;
    selectedIndex?: number;
};

const ColorPicker: React.FC<i_colorPicker_props> = ({ images, setSelectedColorIndex, selectedIndex }) => {
    return (
        <div className="ev-colors">
            {images.map((image, index) => (
                <button
                    key={index}
                    className={`ev-color${selectedIndex === index ? ' is-active' : ''}`}
                    onClick={() => setSelectedColorIndex(index)}
                    aria-label={`Color ${index + 1}`}
                >
                    <img src={image} alt="" />
                </button>
            ))}
        </div>
    );
};

export default ColorPicker;
