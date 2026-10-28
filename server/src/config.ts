import path from 'path';

/** Folder holding the converted .webm videos. Override with VIDEO_DIR in .env if needed. */
export const VIDEO_DIR = path.resolve(process.env.VIDEO_DIR || path.join(process.cwd(), 'src', 'uploads', 'convertedVideos'));
