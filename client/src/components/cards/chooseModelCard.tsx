// Modules
import React, { useState} from 'react';
import MainStyles from '../../styles/main.styles';

// Components
import ColorPicker from '../../components/ui/colorPicker';

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Styles
import CartStyles from '../../styles/cards.style';

// Interfaces
import { i_choose_model_card_props } from '../../interfaces/interfaces';

// const cartColorImage = ['/img/luxor/Luxor4-WHITE.png', '/img/luxor/Luxor4L-BLUE.png', '/img/luxor/LUXOR_2+2-PORTIMAO-BLUE.png', '/img/luxor/LUXOR_2+2LARCTIC-GRAY.png'];
// const colorPickerImages = [
//     '/img/luxor/Luxor_2+2-LIMEGREEN.png',
//     '/img/luxor/Luxor4L-BLUE.png',
//     '/img/luxor/LUXOR_2+2-PORTIMAO-BLUE.png',
//     '/img/luxor/LUXOR_2+2LARCTIC-GRAY.png',
// ];

const ChooseModelCard: React.FC<i_choose_model_card_props> = ({ image, list }) => {

    const mainStyles = MainStyles();
    const cardStyles = CartStyles();
    const isMobile = useWindowSize();

    return (
        <div style={ cardStyles.chooseContainer }>
            <div>
                <img src={image} alt="Luxor4" style={ cardStyles.chooseImageStyle} />
            </div>
            <div>
                <ul style={ cardStyles.chooseListStyle }>
                    {list.map((item, index) => (
                        <>
                            <div style={mainStyles.flex}>
                            <svg style={ cardStyles.chooseIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z"/>
                            </svg>
                            <li style={ cardStyles.chooseList} key={index}>{item}</li>
                            </div>
                        </>
                    ))}
                </ul>
            </div>
            <div>
                {/* <ColorPicker images={colorPickerImages} setSelectedColorIndex={setSelectedImage} /> */}
            </div>
        </div>
    );
};

export default ChooseModelCard;