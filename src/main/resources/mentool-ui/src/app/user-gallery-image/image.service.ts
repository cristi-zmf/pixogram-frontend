import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";
import {ImageIdentificationInfoUpdateCommand} from "./user-image-details/image-identification-info-update-command";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  getImagesIds(userAddress: string): Observable<any> {
    const userAddressParsed = userAddress.replace('@', '%40');
    return this.httpClient.get(`${AppSettings.IMAGES_API_PREFIX}/${userAddressParsed}/images/id-titles`);
  }

  getImageSummary(id: string): Observable<any> {
    return this.httpClient.get(`${AppSettings.IMAGES_API_PREFIX}/summaries/${id}`);
  }

  updateImageIdentificationInfo(updateCommand: ImageIdentificationInfoUpdateCommand): Observable<any> {
    return this.httpClient.post(`${AppSettings.IMAGES_API_PREFIX}/update-identification-info`, updateCommand);
  }
}
