import {Component, DoCheck, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {VideoDto} from '../dto/video-dto';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges, DoCheck {
  public playerHeight = 500;
  public playerWidth = 500;
  private player: YT.Player | undefined;
  public _video: VideoDto | undefined;
  public _videoId: string = "";

  @Input() set video(video: VideoDto | undefined) {
    this._video = video;
    if (this._video) {
      this._videoId = this._video.videoId;
      if (this.player) {
        this.player.loadVideoById(this._videoId);
        this.player.playVideo();
      }
    }
  }

  @Output() videoEnded: EventEmitter<void> = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

  savePlayer(player: YT.Player) {
    this.player = player;
    console.log('player instance', player);
    this.player.playVideo();
  }

  onStateChange(event: any) {
    console.log('player state', event.data);
    // if (this.player && this.player.getPlayerState() === -1) {
    //   this.player.playVideo();
    // }

    if (event.data === 0) {
      this.videoEnded.emit();
    }
  }


  /******************** maybe ***********************/
  ngDoCheck() {
    // if (this.player && this.player.getPlayerState() === -1) {
    //   this.player.playVideo();
    // }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // for (const propName in changes) {
    //   const chng = changes[propName];
    //   const cur = JSON.stringify(chng.currentValue);
    //   const prev = JSON.stringify(chng.previousValue);
    //
    // }
  }

  // ngDoCheck() {
  //   // console.log('ngDoCheck');
  //
  //   if (this.player && this.player.getPlayerState() === -1) {
  //     this.player.playVideo();
  //   }
  //
  //   // if (this.hero.name !== this.oldHeroName) {
  //   //   this.changeDetected = true;
  //   //   this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
  //   //   this.oldHeroName = this.hero.name;
  //   // }
  //   //
  //   // if (this.power !== this.oldPower) {
  //   //   this.changeDetected = true;
  //   //   this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
  //   //   this.oldPower = this.power;
  //   // }
  //   //
  //   // if (this.changeDetected) {
  //   //   this.noChangeCount = 0;
  //   // } else {
  //   //   // log that hook was called when there was no relevant change.
  //   //   const count = this.noChangeCount += 1;
  //   //   const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
  //   //   if (count === 1) {
  //   //     // add new "no change" message
  //   //     this.changeLog.push(noChangeMsg);
  //   //   } else {
  //   //     // update last "no change" message
  //   //     this.changeLog[this.changeLog.length - 1] = noChangeMsg;
  //   //   }
  //   // }
  //   //
  //   // this.changeDetected = false;
  // }

}
