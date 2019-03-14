import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentUserService} from "./login/current-user.service";
import {Router} from "@angular/router";
import {AuthentifiedUser} from "./login/authentified-user";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private currentUser: CurrentUserService, private router: Router) {
    this.currentUser = currentUser;
    this.router = router;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedUser: AuthentifiedUser = this.currentUser.getCurrentUser();
    console.log('intercepting the request before checking the token ' + loggedUser);

    if (loggedUser != null) {
      console.log('intercepting the request');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      });
    }
    return next.handle(req);
  }
}
