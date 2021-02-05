import express, {Express} from "express";
import cors from "cors";
import {corsOption} from "../express/cors-config";
import {VideoService} from "../services/video-service";
import {VideoDto} from "../models/video-dto";

export function registerControllers(app: Express) {
    const router = express.Router();
    router.use(cors(corsOption));

    router.get('/videos', async (req, res, next) => {
        const id: any = req.query.sequenceId;
        const videos: VideoDto[] = await VideoService.instance().getVideos(id);
        res.status(200).send(videos);
    });

    router.post('/videos', async (req, res, next) => {
        const videoId: string = req.body.videoId;
        const videoDto = await VideoService.instance().addVideo(videoId);
        res.status(200).send(videoDto);
    });

    app.use('/api', router);
}
