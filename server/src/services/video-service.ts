import {VideoDto} from "../models/video-dto";
import {VideoDao} from "../cache/video-dao";
import {YoutubeApi} from '../api/youtube-api';

export class VideoService {
    private static _instance: VideoService;
    private videoDao: VideoDao;

    constructor() {
        this.videoDao = new VideoDao();
    }

    static instance() {
        if (!this._instance) {
            this._instance = new VideoService();
        }

        return this._instance;
    }

    public async getVideos(sequenceId: number): Promise<VideoDto[]> {
        return this.videoDao.getNextVideos(sequenceId)
            .map(cachedVideo => <VideoDto>{
                videoId: cachedVideo.videoId,
                sequenceId: cachedVideo.sequenceId,
                title: cachedVideo.title,
                duration: cachedVideo.duration
            });
    }

    public async addVideo(videoId: string): Promise<VideoDto> {
        const videoMetadata = await YoutubeApi.instance().getVideoMetadata(videoId);
        const newVideo = this.videoDao.addVideo(videoId, videoMetadata.title, videoMetadata.duration);
        return <VideoDto>{videoId: newVideo.videoId, sequenceId: newVideo.sequenceId};
    }
}

VideoService.instance();
