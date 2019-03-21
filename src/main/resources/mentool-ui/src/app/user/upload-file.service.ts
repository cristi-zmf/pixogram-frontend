import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) {
  }

  upload(uploadCommands: Array<FormData>): { [key: string]: { progress: Observable<number> } } {
    const status: { [key: string]: { progress: Observable<number> } } = {};

    uploadCommands.forEach(command => {
      const req = new HttpRequest(
        'POST', `${AppSettings.IMAGES_API_PREFIX}/full-images`,
        command, {reportProgress: true}
      )
      const progress = new Subject<number>();
      let startTime = new Date().getTime();
      this.httpClient.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });
      status[command.get("filename").toString()] = {progress: progress.asObservable()};
    });

    return status;
  }
}
