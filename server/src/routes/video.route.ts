

import express, { Request, Response } from 'express';
import { getAllVideoController } from '../controllers/video.controller.js';
const videoRouter = express.Router();

videoRouter.get('/videoCapsules', getAllVideoController);

export default videoRouter;