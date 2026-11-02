// Interface
import { i_shrinkGrow_props } from '../../interfaces/interfaces';

/** Row of photos: the hovered one widens and shows its title and text (CSS only, no GSAP). */
const ShrinkOrGrowImgSection: React.FC<{ shrinkGrowItems: i_shrinkGrow_props[] }> = ({ shrinkGrowItems }) => {
    return (
        <div className="ev-gallery">
            {shrinkGrowItems.map((item, index) => (
                <div key={index} className="ev-gallery__item" tabIndex={0}>
                    <img src={item.image} alt={typeof item.title === 'string' ? item.title : ''} loading="lazy" />
                    <div className="ev-gallery__text">
                        <h3>{item.title}</h3>
                        <p>{item.paragraph}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShrinkOrGrowImgSection;
