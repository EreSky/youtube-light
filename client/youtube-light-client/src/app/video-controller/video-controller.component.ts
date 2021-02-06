import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {parseYoutubeLink} from '../utils/utils';
import {VideoModel} from '../models/video-model';

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.scss']
})
export class VideoControllerComponent {
  @Input() videos = new Array<VideoModel>();
  @Output() videoSubmitted: EventEmitter<string> = new EventEmitter<string>()

  @ViewChild('input') inputRef: ElementRef | undefined;

  constructor() {
  }

  public onVideoSubmit($event: Event) {
    if (this.inputRef) {
      const link = this.inputRef.nativeElement.value;
      this.trySubmit(link);
    }
  }

  private trySubmit(link: string) {
    let videoId;
    try {
      videoId = parseYoutubeLink(link);
    } catch (e) {
      return;
    } finally {
      this.inputRef ? this.inputRef.nativeElement.value = '' : undefined;
    }

    this.videoSubmitted.emit(videoId);
  }
}
