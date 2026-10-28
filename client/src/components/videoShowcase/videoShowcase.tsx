

// Modules
import React, { useContext } from 'react';
import { LanguageContext } from '../../translations/languageSelection';

// Styles
import HomeStyles from '../../styles/home.style';

// Interface
interface VideoShowcaseProps {
    videoCapsules: { 
        title: {
            en: string;
            fr: string;
        }; 
        description?: {
            en: string | null;
            fr: string | null;
        };
        path?: string;
        videoUrl: string;
    }[];
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videoCapsules }) => {
    const homeStyles = HomeStyles();
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', maxWidth: '1200px', margin: '0 auto', justifyContent: 'center' }}>
            {videoCapsules.map((video, index) => (
                <div key={index} style={{ width: 'calc(33.333% - 1.334rem)', minWidth: '300px', maxWidth: '400px', textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', height: '300px', overflow: 'hidden', background: '#000', borderRadius: '5px' }}>
                        <video 
                            controls 
                            controlsList="nodownload" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                            onError={(e) => console.error('Video error:', e.currentTarget.error)}
                        >
                            <source src={video.videoUrl} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h3 style={{ color: 'black', marginTop: '10px' }}>{video.title[L]}</h3>
                </div>
            ))}
        </div>
    );
};

export default VideoShowcase;
