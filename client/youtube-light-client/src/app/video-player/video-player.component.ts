import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VideoModel} from '../models/video-model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  public playerHeight = 500;
  public playerWidth = 500;
  private player: YT.Player | undefined;
  public _video: VideoModel | undefined;
  public _videoId: string = "";

  @Output() videoEnded: EventEmitter<void> = new EventEmitter()

  @Input() set video(video: VideoModel | undefined) {
    this._video = video;
    if (this._video) {
      this._videoId = this._video.videoId;
      if (this.player && !this.isPlaying()) {
        this.player.loadVideoById(this._videoId);
        this.player.playVideo();
      }
    }
  }

  constructor() {
  }

  public savePlayer(player: YT.Player) {
    this.player = player;
  }

  public onStateChange(event: any) {
    console.log('player state', event.data);
    if (VideoPlayerComponent.isVideoEnded(event)) {
      this.videoEnded.emit();
    }
  }

  private isPlaying(): undefined | boolean {
    return this.player && this.player.getPlayerState() === 1;
  }

  private static isVideoEnded(event: any): boolean {
    return event.data === 0;
  }
}
