

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
        <div className="ev-videos ev-stagger" style={{ margin: 0 }}>
            {videoCapsules.map((video, index) => (
                <div key={index} className="ev-video">
                    <div className="ev-video__frame">
                        <video
                            controls
                            controlsList="nodownload"
                            preload="metadata"
                            onError={(e) => console.error('Video error:', e.currentTarget.error)}
                        >
                            <source src={video.videoUrl} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h3 className="ev-video__title">{video.title[L]}</h3>
                </div>
            ))}
        </div>
    );
};

export default VideoShowcase;
