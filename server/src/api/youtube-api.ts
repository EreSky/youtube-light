import request from 'superagent';

export class YoutubeApi {
    private static _instance: YoutubeApi;
    private youtubeApiKey = 'AIzaSyCwiJSYMZZyOhzX8-_rY21MiecwKZvsXjU';

    constructor() {
    }

    static instance() {
        if (!this._instance) {
            this._instance = new YoutubeApi();
        }

        return this._instance;
    }

    public async getVideoMetadata(videoId: string): Promise<{ title: string, duration: number }> {
        const response = await request
            .get('https://www.googleapis.com/youtube/v3/videos')
            .query({id: videoId})
            .query({key: this.youtubeApiKey})
            .query({part: 'snippet,contentDetails'});

        const title = response.body.items[0].snippet.title;
        const videoDuration = YoutubeApi.youtubeDurationToSeconds(response.body.items[0].contentDetails.duration);

        return {title: title, duration: videoDuration}
    }

    private static youtubeDurationToSeconds(duration: string) {
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        duration = duration.replace('PT', '');

        if (duration.indexOf('H') > -1) {
            let hours_split = duration.split('H');
            hours = parseInt(hours_split[0]);
            duration = hours_split[1];
        }

        if (duration.indexOf('M') > -1) {
            let minutes_split = duration.split('M');
            minutes = parseInt(minutes_split[0]);
            duration = minutes_split[1];
        }

        if (duration.indexOf('S') > -1) {
            let seconds_split = duration.split('S');
            seconds = parseInt(seconds_split[0]);
        }

        return (hours * 60 * 60) + (minutes * 60) + seconds;
    }
}

YoutubeApi.instance();
