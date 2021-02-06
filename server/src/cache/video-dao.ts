import {Collection} from 'lokijs';

const loki = require('lokijs');

export class VideoDao {
    private static collectionName = 'video-cache';
    private static db: any;
    private cacheCollection: Collection;

    constructor() {
        this.cacheCollection = VideoDao.db.getCollection(VideoDao.collectionName);
        this.cacheCollection.on('insert', (video) => { video.sequenceId = video.$loki });
    }

    static init() {
        const videoCacheOptions = {
            unique: ['sequenceId']
        };

        if (!VideoDao.db) {
            VideoDao.db = new loki('webserver-cache.db');
        }

        if (!VideoDao.db.getCollection(this.collectionName)) {
            VideoDao.db.addCollection(this.collectionName, videoCacheOptions);
        }
    }

    public getNextVideos(sequenceId: number): any[] {
        return this.cacheCollection.find({'sequenceId': {'$gt': sequenceId}});
    }

    public addVideo(videoId: string, title: string, duration: number): any {
        return this.cacheCollection.insert({videoId, title, duration});
    }
}

VideoDao.init();
