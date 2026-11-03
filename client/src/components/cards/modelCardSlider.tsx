

// Modules
import React, { useState } from 'react';

// Styles
import homeSliderStyles from '../../styles/slider.style';

// Interfaces
import { i_modelCardProps } from '../../interfaces/interfaces';

// Pick<...> = only these three fields of i_modelCardProps (the card shows no specs)
const ModelCard: React.FC<Pick<i_modelCardProps, 'image' | 'title' | 'link'>> = ({ image, title, link, ...customStyle }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyles = {...homeSliderStyles, ...customStyle};

    return (
        <div style={cardStyles.cardStyle} onClick={() => link && (window.location.href = link)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <img src={image} alt={title} style={{...cardStyles.cardImageStyle, transform: isHovered ? 'scale(1.05)' : 'scale(1)'}} />
            <div style={cardStyles.cardTitleStyle}>{title}</div>
        </div>
    );
};

export default ModelCard;
