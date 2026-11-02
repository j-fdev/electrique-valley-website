import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { AppDataSource } from "./database/sql";
import emailRouter from './routes/email.route';
import videoRouter from './routes/video.route';
import { convertAllVideos } from './uploads/convert';
import { VIDEO_DIR } from './config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// FRONTEND_URL can list several addresses separated by commas,
// e.g. https://electriquevalley.com,https://www.electriquevalley.com
const ALLOWED_ORIGINS = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

// The API sits behind a reverse proxy on the same server: trust it, so req.ip is the
// visitor's real IP address (the rate limiter on the forms depends on it).
app.set('trust proxy', 'loopback');
app.disable('x-powered-by');

app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    exposedHeaders: ['Content-Length', 'Retry-After', 'Content-Type'],
    methods: ['GET', 'POST', 'OPTIONS'],
}));
// The forms only send a few fields: refuse oversized bodies.
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static('public'));

app.use('/videos', (req: Request, res: Response, next: NextFunction) => {
    res.set({
        'Accept-Ranges': 'bytes',
        'Content-Type': 'video/webm',
        'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(req.get('origin') ?? '') ? req.get('origin')! : ALLOWED_ORIGINS[0],
        'Vary': 'Origin',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Range',
        'Access-Control-Expose-Headers': 'Accept-Ranges, Content-Length, Content-Range',
    });

    if (req.method === 'GET') {
        let videoPath: string;
        try {
            videoPath = path.resolve(VIDEO_DIR, '.' + decodeURIComponent(req.path));
        } catch {
            res.status(400).send('Invalid video path');
            return;
        }
        // Only files inside the video folder can be served.
        if (!videoPath.startsWith(VIDEO_DIR + path.sep) || !fs.existsSync(videoPath)) {
            res.status(404).send('Video not found');
            return;
        }
    }
    next();
});
app.use('/videos', express.static(VIDEO_DIR));

app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Electrique Valley API is running' });
});

app.use('/api/email', emailRouter);
app.use('/api', videoRouter);

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        try {
            await convertAllVideos();
            console.log("Video conversion routine complete.");
        } catch (error) {
            console.error("Video conversion failed:", error);
        }
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });
