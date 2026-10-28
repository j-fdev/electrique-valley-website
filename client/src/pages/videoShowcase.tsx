

// Modules
import React, { useContext, useEffect, useState } from 'react';

// Components
import VideoShowcase from "../components/videoShowcase/videoShowcase";

// Config
import { apiCall } from '../config/api.config';

// Styles
import CartsModelsStyles from '../styles/cartModels.styles';
import HomeStyles from '../styles/home.style';
import MainStyles from '../styles/main.styles';
import CartStyles from '../styles/cards.style';

// Translations
import { translations } from '../translations/trans.videoShowcase';
import { LanguageContext } from '../translations/languageSelection';
import { i_videoCapsule } from '../interfaces/interfaces';

const VideoShowcasePage = () => {
    const cartsModelsStyles = CartsModelsStyles();
    const mainStyles = MainStyles();
    const T = translations.videoShowcase;
    const languageContext = useContext(LanguageContext);
    const L = languageContext ? languageContext.language : 'en';
    const [videoCapsules, setVideoCapsules] = useState<i_videoCapsule[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getVideoCapsules = async () => {
            try {
                setIsLoading(true);
                
                const videoData = await apiCall('/api/videoCapsules', {
                    method: 'GET',
                });

                if (videoData.type === 'Success') {
                    const transformed: i_videoCapsule[] = videoData.data.map((video: any) => ({
                        id: video.id,
                        title: {
                            en: video.title.en || video.title,
                            fr: video.title.fr || video.title
                        },
                        description: video.description ? {
                            en: video.description.en || null,
                            fr: video.description.fr || null
                        } : undefined,
                        path: video?.path ,
                        videoUrl: video.url
                    }));
                    setVideoCapsules(transformed);
                } else {
                    setError(videoData.message || 'Failed to load videos');
                }
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('Failed to load videos. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        console.log("Video capsules: ", videoCapsules);
        getVideoCapsules();
    }, []);
    
    if (isLoading) {
        return (
            <div style={{ padding: '20px', backgroundColor: '#000', color: 'white', textAlign: 'center' }}>
                Loading videos...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', backgroundColor: '#000', color: 'red', textAlign: 'center' }}>
                {error}
            </div>
        );
    }

    return (
        <>
        <section style={{ ...mainStyles.section }}>
            <div style={{ ...mainStyles.container, textAlign: 'center' }}>
                <h1 style={{ ...cartsModelsStyles.headerTitle, padding: '15px 0' }}>{T.h1_videoShowcase[L]}</h1>
                <div style={{ marginTop: '100px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <VideoShowcase videoCapsules={videoCapsules} />
                </div>
            </div>
        </section>
        </>
    );
}

export default VideoShowcasePage;