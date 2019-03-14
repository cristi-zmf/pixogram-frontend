import {Injectable} from '@angular/core';
import {AuthentifiedUser} from './authentified-user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public static CURRENT_USER = 'currentUser';
  constructor() { }

  public getCurrentUser(): AuthentifiedUser {
    return JSON.parse(localStorage.getItem(CurrentUserService.CURRENT_USER));
  }
  public isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
