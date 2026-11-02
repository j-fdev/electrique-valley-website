// Interfaces
import { i_featuresCards_props } from "../../interfaces/interfaces";

// Styles
import '../../styles/home.modern.css';

const FeaturesCards: React.FC<i_featuresCards_props> = ({icon, title, description}) => {
    return (
        <div className="ev-feature">
            <div className="ev-feature__icon">{icon}</div>
            <h3 className="ev-feature__title">{title}</h3>
            <p className="ev-feature__text">{description}</p>
        </div>
    )
};

export default FeaturesCards;
