

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
    const [error, setError] = useState(false);
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
                    console.error('Video capsules:', videoData.message);
                    setError(true);
                }
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        console.log("Video capsules: ", videoCapsules);
        getVideoCapsules();
    }, []);
    
    return (
        <>
            <section className="ev-page-hero">
                <div className="ev-container"><h1>{T.h1_videoShowcase[L]}</h1></div>
            </section>
            <section className="ev-section" style={{ paddingTop: 'clamp(2.5rem, 6vw, 4rem)' }}>
                <div className="ev-container">
                    {/* The title always shows (also in the pre-rendered page); only the list waits for the API */}
                    {isLoading && <p role="status">{T.p_loading[L]}</p>}
                    {!isLoading && error && <p role="alert">{T.p_error[L]}</p>}
                    {!isLoading && !error && <VideoShowcase videoCapsules={videoCapsules} />}
                </div>
            </section>
        </>
    );
}

export default VideoShowcasePage;