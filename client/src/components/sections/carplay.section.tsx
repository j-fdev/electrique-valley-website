// Styles
import MainStyles from "../../styles/main.styles";
import version from '../../config/version';

// Hooks
import { useWindowSize } from '../../hooks/useWindowSize';

const CarPlaySection = () => {
    const mainStyle = MainStyles();
    const isMobile = useWindowSize();

    return (
        <div style={{...mainStyle.section, backgroundColor: 'var(--clr-black)'}}>
            <div style={{...mainStyle.container, textAlign: 'center'}}>
                <img style={ mainStyle.carplayLogo} src={`/img/main/900px-Apple_CarPlay_Logo.png?v=${version}`} alt="" />
                <h2 style={{ ...mainStyle.title, color: 'white' }}>TOUCHSCREEN WITH CARPLAY COMPATIBILITY</h2>
                <p style={{ ...mainStyle.paragraph, color: 'white', fontSize: isMobile ? '1rem' : '1.250rem', marginInline: 'auto'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit architecto ratione consectetur odio maiores, odit adipisci? Odit illum porro itaque tenetur assumenda quidem, similique impedit dignissimos, velit ipsam aliquam voluptatum.</p>
            </div>
            <div style={ mainStyle.carplayImageDiv}><img style={ mainStyle.carplayImage} src={`/img/home/blackScreenImage.webp?v=${version}`} alt="" /></div>
        </div>
    )

};

export default CarPlaySection;