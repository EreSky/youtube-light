import {Component, DoCheck, NgZone, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {YoutubePlayerService} from "ngx-youtube-player/lib/ngx-youtube-player.service";
import {VideoApiService} from './api/video-api.service';
import {VideoDto} from './dto/video-dto';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'YouTube Light';
  public allVideos = new Array<VideoDto>();
  // public allVideos: Observable<VideoDto | undefined> | undefined;

  constructor(private videoApiService: VideoApiService) {
  }

  ngOnInit(): void {
    this.videoApiService.videos.subscribe(value => {
      if (value) {
        this.allVideos.push(value);
      }
    });

    // this.allVideos = this.videoApiService.videos;
  }

  onVideoSubmitted(videoId: string) {
    this.videoApiService.postNewVideo(videoId)
      .subscribe(
        () => console.log('submitted successfully'),
        () => console.log('failed to submit'));
  }

  onVideoEnded(event: void) {
    this.videoApiService.removeVideo();
    // this.allVideos.shift();
  }

  // public onVideoSubmit(event: Event) {
  //   // @ts-ignore
  //   const link = event.target.value;
  //   const videoId = parseYoutubeLink(link);
  //
  //   this.videoApiService.postNewVideo(videoId)
  //     .subscribe(
  //       () => console.log('submitted successfully'),
  //       () => console.log('failed to submit'));
  // }

}
