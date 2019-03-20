import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient) {}

  public getSkills(): Observable<any> {
    return this.httpClient.get(`${AppSettings.IMAGES_API_PREFIX}/skills`);
  }

  public addSkill(skillCreateCommand: any): Observable<any> {
    return this.httpClient.put(`${AppSettings.IMAGES_API_PREFIX}/skills`, skillCreateCommand);
  }
}
