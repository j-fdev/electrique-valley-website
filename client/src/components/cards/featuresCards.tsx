// Interfaces
import { i_featuresCards_props } from "../../interfaces/interfaces";

// Styles
import HomeStyles from '../../styles/home.style';
import CardStyles  from '../../styles/cards.style';


const FeaturesCards: React.FC<i_featuresCards_props> = ({icon, title, description}) => {

    const homeStyles = HomeStyles();
    const cardStyles = CardStyles();

    return (
        <div style={ cardStyles.featuresContainer }>
            <div style={{ ...homeStyles.featuresIcons, marginInline: 'auto' }}>{icon}</div>
            <h3 style={{ marginTop: '15px', color: 'white'}}>{title}</h3>
            <p style={{ marginTop: '15px'}}>{description}</p>
        </div>
    )
};

export default FeaturesCards;




