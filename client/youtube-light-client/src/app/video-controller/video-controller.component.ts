import { Component, OnInit } from '@angular/core';
import {VideoApiService} from "../api/video-api.service";
import {Observable} from "rxjs";
import {VideoDto} from "../dto/video-dto";

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.scss']
})
export class VideoControllerComponent implements OnInit {
  public allVideos: Observable<VideoDto[]> | undefined;

  constructor(private videoApiService: VideoApiService) { }

  ngOnInit(): void {
    this.allVideos = this.videoApiService.getAllVideos();
  }

}
