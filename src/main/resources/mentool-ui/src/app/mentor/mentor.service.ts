import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";
const SECURITY_API = `${AppSettings.API_PREFIX}/mentors`;
const PERSONS_API = `${AppSettings.PERSONS_API_PREFIX}/mentors`;


@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private httpClient: HttpClient) { }
  registerMentor(mentorCommand: any): Observable<any> {
    return this.httpClient.put(`${SECURITY_API}`, mentorCommand);
  }

  updateMentor(mentorCommand: any): Observable<any> {
    return this.httpClient.post(`${PERSONS_API}`, mentorCommand);
  }

  getMentor(mentorAddress: string): Observable<any> {
    const mentorAddressParsed = mentorAddress.replace('@', '%40');
    return this.httpClient.get(`${PERSONS_API}/${mentorAddressParsed}`);
  }
}
