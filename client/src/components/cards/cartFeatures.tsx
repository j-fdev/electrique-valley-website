// Interface
import { i_cart_features_props } from '../../interfaces/interfaces';

const CartFeatures: React.FC<i_cart_features_props> = ({ image, title, description }) => {
    return (
        <article className="ev-fcard">
            <div className="ev-fcard__media">
                <img src={image} alt={typeof title === 'string' ? title : ''} loading="lazy" />
            </div>
            <div className="ev-fcard__body">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </article>
    );
};

export default CartFeatures;
