import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {any} from "codelyzer/util/function";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  getImagesIds(userAddress: string): Observable<any> {
    const userAddressParsed = userAddress.replace('@', '%40');
    return this.httpClient.get(`${AppSettings.IMAGES_API_PREFIX}/${userAddressParsed}/images/id-titles`);
  }
}
