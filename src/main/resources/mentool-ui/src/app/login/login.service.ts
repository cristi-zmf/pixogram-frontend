import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthentifiedUser} from './authentified-user';
import {LoginRequest} from './login-request';
import {CurrentUserService} from './current-user.service';
import {Router} from '@angular/router';
import {Observable, Subject} from "rxjs";
import {Role} from "../authorities/role.enum";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router: Router, private http: HttpClient) {
    this.http = http;
    this.router = router;
  }

  private userSubject: Subject<AuthentifiedUser> = new Subject();

  watchLogin(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(username: string, password: string): void {
    this.http.post('/api/token/generate-token', new LoginRequest(username, password))
      .subscribe(
        (authentifiedUser: AuthentifiedUser) => {
          console.log("luam userul: " + authentifiedUser);
          localStorage.setItem(CurrentUserService.CURRENT_USER, JSON.stringify(authentifiedUser));
          this.userSubject.next(authentifiedUser);
          const role = authentifiedUser.role;
          if (role === Role.USER) {
            this.router.navigate(['user-profile']);
          } else if(role === Role.MENTOR) {
            this.router.navigate([`mentor/view/${authentifiedUser.username}`]);
          } else {
            this.router.navigate([`admin`]);
          }
        },
        (err => console.log(err))
      );
  }


  logout(): void {
    localStorage.removeItem(CurrentUserService.CURRENT_USER);
    this.userSubject.next(null);
    this.router.navigate(['login']);
  }
}
