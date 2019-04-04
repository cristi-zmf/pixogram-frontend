import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserConsult} from "./user";
import {AppSettings} from "../app-settings";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getAuthorities(): Observable<any> {
    return this.http.get(`${AppSettings.API_PREFIX}/authorities`)
  }

  public lockAuthority(authorityEmail: string) {
    authorityEmail = this.replaceSpecialCharacter(authorityEmail);
    return this.http.post(`${AppSettings.API_PREFIX}/authorities/${authorityEmail}/lock`, null)
  }

  public unlockAuthority(authorityEmail: string) {
    authorityEmail = this.replaceSpecialCharacter(authorityEmail);
    return this.http.post(`${AppSettings.API_PREFIX}/authorities/${authorityEmail}/unlock`, null)
  }

  private replaceSpecialCharacter(authorityEmail: string) {
    return authorityEmail.replace('@', '%40');
  }
}
