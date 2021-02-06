import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError, timer} from 'rxjs';
import {catchError, retry, share, switchMap, takeUntil, tap} from 'rxjs/operators';
import {VideoDto} from '../dto/video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoApiService implements OnDestroy {
  private stopPolling = new Subject();
  private videosSubject = new BehaviorSubject<VideoDto | undefined>(undefined);

  public get videos(): Observable<VideoDto | undefined> {
    return this.videosSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    timer(1, 3000)
      .pipe(
        // const length = count(),
        switchMap(() => http.get<VideoDto[]>(`http://localhost:3000/api/videos?sequenceId=${this.videosSubject.value ?
          this.videosSubject.value.sequenceId : 0}`)),
        retry(),
        // tap(console.log),
        tap(data => {
          data.forEach(item => this.videosSubject.next(item))
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
    // this.videosSubject.
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }


}
