// Modules
import React, { useState } from 'react';

// Styles
import CardStyles from '../../styles/cards.style';

// Interfaces
import { i_btn_card_props } from '../../interfaces/interfaces';

const ButtonCard: React.FC<i_btn_card_props> = ({ customDivStyle, customImageStyle, customTextStyle, image, title, onClick }) => {
    const cardStyles = CardStyles();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{ ...cardStyles.cardStyle, ...customDivStyle }} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <img src={image} alt={title} style={{ ...cardStyles.defaultImageStyle, ...customImageStyle, transform: isHovered ? 'scale(1.05)' : 'scale(1)' }} />
            <h3 style={{ ...cardStyles.cardTitleStyle, ...customTextStyle, transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>{title}</h3>
        </div>
    );
};

export default ButtonCard;