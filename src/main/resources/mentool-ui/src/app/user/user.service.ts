import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";
import {UserEditCommand} from "./user-edit-command";
const SECURITY_API = `${AppSettings.API_PREFIX}/users`;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  registerUser(userCreateCommand: any): Observable<any> {
    return this.httpClient.post(`${SECURITY_API}`, userCreateCommand);
  }

  editUser(command: UserEditCommand): Observable<any> {
    return this.httpClient.put(`${SECURITY_API}`, command);
  }


  getUser(userAddress: string): Observable<any> {
    const userAddressParsed = userAddress.replace('@', '%40');
    return this.httpClient.get(`${SECURITY_API}/${userAddressParsed}`);
  }
}
