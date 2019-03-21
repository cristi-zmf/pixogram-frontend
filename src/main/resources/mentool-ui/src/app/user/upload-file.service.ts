import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private httpClient: HttpClient) { }

  upload(uploadCommand: FormData): Observable<any> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post(`${AppSettings.IMAGES_API_PREFIX}/full-images`, uploadCommand, );
  }
}
