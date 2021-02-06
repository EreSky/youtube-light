import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError, timer} from 'rxjs';
import {catchError, retry, share, switchMap, takeUntil, tap} from 'rxjs/operators';
import {VideoDto} from '../dto/video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService implements OnDestroy {
  private allVideos = new Array<VideoDto>();
  private lastSequenceId = 0;

  private stopPolling = new Subject();
  private videosSubject = new BehaviorSubject<VideoDto[]>(this.allVideos);

  public get videos(): Observable<VideoDto[]> {
    return this.videosSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    timer(1, 3000)
      .pipe(
        switchMap(() => http.get<VideoDto[]>(`http://localhost:3000/api/videos?sequenceId=${this.lastSequenceId}`)),
        retry(),
        tap(videoDtoCollection => {
          videoDtoCollection.forEach(videoDto => {
            this.allVideos.push(videoDto);
            this.lastSequenceId = videoDto.sequenceId;
          })
          if (this.allVideos.length > 0 && videoDtoCollection.length > 0) {
            this.videosSubject.next(this.allVideos);
          }
        }),
        share(),
        takeUntil(this.stopPolling)
      ).subscribe();
  }

  public postNewVideo(videoId: string) {
    const payload = {videoId: videoId};
    const response = this.http.post('http://localhost:3000/api/videos', payload);

    return response
      .pipe(
        catchError(err => {
          console.log(`error posting new video: `, err);
          return throwError(err);
        })
      );
  }

  public removeVideo() {
    this.allVideos.shift();
    this.videosSubject.next(this.allVideos)
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
}
