

import { Request, Response } from 'express';
import { AppDataSource } from "../database/sql";
import { VideoCapsule } from "../entities/video_capsules.model";
import fs from 'fs';
import { VIDEO_DIR } from '../config';

interface i_video_capsule {
    id?: number;
    title: string;
    description: string;
    fileName: string;
    path: string;
    uploadedAt: Date;
};

interface i_video_capsule_response {
    id: number;
    title: {
        en: string;
        fr: string;
    };
    url: string;
};

const getAllVideoController = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Getting all videos...");
        const video_repo = AppDataSource.getRepository(VideoCapsule);
        const videos = await video_repo.find();

         const videoDir = VIDEO_DIR;
         console.log('Checking video directory:', videoDir);
         
         if (!fs.existsSync(videoDir)) {
             console.error('Video directory not found:', videoDir);
             res.status(500).json({ message: 'Video directory not found' });
             return;
         }
 
         // List all files in directory
         const files = fs.readdirSync(videoDir);
         console.log('Files in video directory:', files);
       
        if (videos.length === 0) {
            console.log("No videos found");
            res.status(404).json({ message: 'Video not found' })
            return;
        }
        const apiBaseUrl = (process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
        const videoResults: i_video_capsule_response[] = videos.map(video => ({
            id: video.id,
            title: video.title,
            description: video.description,
            path: video.path,
            // Full address of the file. BACKEND_URL (e.g. https://api.electriquevalley.com) wins;
            // otherwise it is built from the request (the proxy passes the https scheme along).
            url: `${apiBaseUrl}/videos/${encodeURIComponent(video.fileName)}`
        }));

        console.log('Sending video results:', videoResults);
        res.status(200).json({ 
            type: 'Success', 
            message: 'The video capsules have been sent correctly.',
            data: videoResults 
        });    
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { getAllVideoController };