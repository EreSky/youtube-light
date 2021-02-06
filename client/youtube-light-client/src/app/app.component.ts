import {Component, OnInit} from "@angular/core";
import {VideoApiService} from './api/video-api.service';
import {VideoModel} from './models/video-model';
import {videoDuration} from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'YouTube Light';
  public allVideos = new Array<VideoModel>();

  constructor(private videoApiService: VideoApiService) {
  }

  ngOnInit(): void {
    this.videoApiService.videos.subscribe(videos => {
      this.allVideos = videos
        .map(video => <VideoModel>{
          videoId: video.videoId,
          sequenceId: video.sequenceId,
          title: video.title,
          duration: videoDuration(video.duration)
        });
    });
  }

  onVideoSubmitted(videoId: string) {
    this.videoApiService.postNewVideo(videoId)
      .subscribe(
        () => console.log('submitted successfully'),
        () => console.log('failed to submit'));
  }

  onVideoEnded(event: void) {
    this.videoApiService.removeVideo();
  }
}
