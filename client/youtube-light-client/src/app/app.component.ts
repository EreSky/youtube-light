import {Component, OnInit} from "@angular/core";
import {VideoApiService} from './api/video-api.service';
import {VideoDto} from './dto/video-dto';
import {VideoModel} from './models/video-model';
import {videoDuration} from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'YouTube Light';
  private player: YT.Player | undefined;
  public allVideos = new Array<VideoDto>();
  public allVideosModels = new Array<VideoModel>();

  constructor(private videoApiService: VideoApiService) {
  }

  ngOnInit(): void {
    this.videoApiService.videos.subscribe(videos => {
      this.allVideos = videos;
      this.allVideosModels = this.allVideos.map(value => {
        return {
          sequenceId: value.sequenceId,
          videoId: value.videoId,
          duration: this.getVideoDuration(value.videoId),
          title: this.geVideoTitle(value.videoId)
        };
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

  savePlayer(player: YT.Player) {
    this.player = player;

    // @ts-ignore
    // this.allVideosModels = this.allVideos.map(value => {
    //   return {
    //     sequenceId: value.videoId,
    //     videoId: value.videoId,
    //     duration: this.getVideoDuration(value.videoId),
    //     title: this.geVideoTitle(value.videoId)
    //   };
    // });
  }

  onStateChange(event: any) {
    console.log('hidden player state', event.data);

    // @ts-ignore
    // this.allVideosModels = this.allVideos.map(value => {~
    //   return {
    //     sequenceId: value.videoId,
    //     videoId: value.videoId,
    //     duration: this.getVideoDuration(value.videoId),
    //     title: this.geVideoTitle(value.videoId)
    //   };
    // });
  }

  private getVideoDuration(videoId: string): string {
    if (this.player) {
      this.player.loadVideoById(videoId);
      const duration = this.player.getDuration();
      if (duration) {
        const durationFormat = videoDuration(duration);
        return durationFormat;
      } else {
        return '0';
      }
    } else {
      return '0';
    }
  }

  private geVideoTitle(videoId: string): string {
    if (this.player) {
      this.player.loadVideoById(videoId);
      // @ts-ignore
      if (this.player.getVideoData()) {
        // @ts-ignore
        const title = this.player.getVideoData().title;
        return title;
      } else {
        return '';
      }

    } else {
      return '';
    }
  }
}
