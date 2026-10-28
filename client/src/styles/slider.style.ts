

// Modules
import { CSSProperties } from 'react';

const heroSlider: CSSProperties = { width: '100%', height: '100%', position: 'relative' };

const heroSliderImg: CSSProperties = { width: '100%', height: '90vh', objectFit: 'cover', objectPosition: 'center 80%' };

const cardStyle: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', margin: '10px', cursor: 'pointer', position: 'relative' };

const cardImageStyle: CSSProperties = { width: '100%', height: '300px', objectFit: 'cover', transition: 'transform 0.3s ease' };

const cardTitleStyle: CSSProperties = { position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', textAlign: 'center', width: '100%'};

const homeSliderStyles = { heroSlider, heroSliderImg, cardStyle, cardImageStyle, cardTitleStyle };

export default homeSliderStyles;
