// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

// Styles
import CardStyles from '../../styles/cards.style';

// Interface
import { i_cart_features_props } from '../../interfaces/interfaces';

const CartFeatures: React.FC<i_cart_features_props> = ({ image, title, description }) => {
    const isMobile = useWindowSize();
    const cardStyles = CardStyles();

    return (
        <div style={{}}>
            <div style={ cardStyles.imageDivStyle }>
                <img style={ cardStyles.imageStyle} src={image} alt="" />
            </div>
            <h3 style={{ margin: '10px 0' }}>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default CartFeatures;