import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VideoApiService} from '../api/video-api.service';
import {VideoDto} from '../dto/video-dto';
import {parseYoutubeLink} from '../utils/utils';

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.scss']
})
export class VideoControllerComponent /*implements OnInit*/ {
  @Input() videos = new Array<VideoDto>();
  @Output() videoSubmitted: EventEmitter<string> = new EventEmitter<string>()

  constructor(/*private videoApiService: VideoApiService*/) {
  }

  public onVideoSubmit(event: Event) {
    // @ts-ignore
    const link = event.target.value;
    const videoId = parseYoutubeLink(link);

    this.videoSubmitted.emit(videoId);
  }

  // ngOnInit(): void {
  //   this.videoApiService.videos.subscribe(value => {
  //     if (value) {
  //       this.allVideos.push(value);
  //     }
  //   });
  // }

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
