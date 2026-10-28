// Modules
import React, { useState } from 'react';

// Styles
import mainStyle from '../../styles/main.styles';

// Interfaces
import { i_button_props } from '../../interfaces/interfaces';

interface ButtonProps extends i_button_props {
    onHoverChange?: (isHovered: boolean) => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, customStyle, onHoverChange }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
    };

    const buttonStyle = { 
        ...mainStyle().mainBtn(isHovered), 
        ...customStyle, 
    };

    return (
        <button style={buttonStyle} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            {children}
        </button>
    );
};

export default Button;
