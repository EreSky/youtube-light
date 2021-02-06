import {Component, DoCheck, NgZone, OnChanges, SimpleChanges} from "@angular/core";
import {YoutubePlayerService} from "ngx-youtube-player/lib/ngx-youtube-player.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, DoCheck {
  private player: YT.Player | undefined;
  public id: string = 'qDuKsiwS5xw';

  constructor(zone: NgZone) {
    // let service: YoutubePlayerService = new YoutubePlayerService(zone);

  }

  savePlayer(player: YT.Player) {
    this.player = player;
    console.log('player instance', player);
    this.player.playVideo();

  }

  onStateChange(event: any) {
    console.log('player state', event.data);
    if (this.player && this.player.getPlayerState() === -1) {
      this.player.playVideo();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);

    }
  }

  ngDoCheck() {
    console.log('ngDoCheck');

    if (this.player && this.player.getPlayerState() === -1) {
      this.player.playVideo();
    }

    // if (this.hero.name !== this.oldHeroName) {
    //   this.changeDetected = true;
    //   this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
    //   this.oldHeroName = this.hero.name;
    // }
    //
    // if (this.power !== this.oldPower) {
    //   this.changeDetected = true;
    //   this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
    //   this.oldPower = this.power;
    // }
    //
    // if (this.changeDetected) {
    //   this.noChangeCount = 0;
    // } else {
    //   // log that hook was called when there was no relevant change.
    //   const count = this.noChangeCount += 1;
    //   const noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
    //   if (count === 1) {
    //     // add new "no change" message
    //     this.changeLog.push(noChangeMsg);
    //   } else {
    //     // update last "no change" message
    //     this.changeLog[this.changeLog.length - 1] = noChangeMsg;
    //   }
    // }
    //
    // this.changeDetected = false;
  }

}
