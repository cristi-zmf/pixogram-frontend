import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app-settings";
import {Observable} from "rxjs";
import {FollowUnfollowCommand} from "./follow-unfollow-command";
import {ListByEmailsCommand} from "../user-gallery-image/list-by-emails-command";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get(`${AppSettings.API_PREFIX}/users`)
  }

  public listFollowing(): Observable<any> {
    return this.http.get(`${AppSettings.API_PREFIX}/users/following`)
  }

  public listByAddresses(command: ListByEmailsCommand): Observable<any> {
    return this.http.post(`${AppSettings.API_PREFIX}/users/emails`, command);
  }

  public getUser(email: string): Observable<any> {
    email = this.replaceSpecialCharacter(email);
    return this.http.get(`${AppSettings.API_PREFIX}/users/${email}`);
  }

  public followUser(command: FollowUnfollowCommand): Observable<any> {
    return this.http.put(`${AppSettings.API_PREFIX}/users/follow-user`, command);
  }

  public unfollowUser(command: FollowUnfollowCommand): Observable<any> {
    return this.http.put(`${AppSettings.API_PREFIX}/users/unfollow-user`, command);
  }


  private replaceSpecialCharacter(authorityEmail: string) {
    return authorityEmail.replace('@', '%40');
  }
}
