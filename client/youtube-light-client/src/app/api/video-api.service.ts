import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, Observable, OperatorFunction, Subject, timer} from "rxjs";
import {count, last, retry, share, switchMap, takeUntil, tap} from "rxjs/operators";
import {VideoDto} from "../dto/video-dto";

@Injectable({
  providedIn: 'root'
})
export class VideoApiService implements OnDestroy {
  private allVideos: Observable<VideoDto[]>;
  private stopPolling = new Subject();
  private allVideosLength = 0;

  constructor(private http: HttpClient) {
    this.allVideos = timer(1, 3000)
      .pipe(
        // const length = count(),
        switchMap(() => http.get<VideoDto[]>(`http://localhost:3000/api/videos?sequenceId=${this.allVideosLength}`)),
        retry(),
        tap(console.log),
        share(),
        takeUntil(this.stopPolling)
      );

    // this.allVideos.pipe(count())
    //   .subscribe(length => this.allVideosLength = length);

    this.allVideos.pipe(last())
      .subscribe(arr => this.allVideosLength = arr[arr.length -1].sequenceId);

  }

  getAllVideos(): Observable<VideoDto[]> {
    return this.allVideos.pipe(
      tap(() => {
        console.log('data sent to subscriber');
      })
    );
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
}
