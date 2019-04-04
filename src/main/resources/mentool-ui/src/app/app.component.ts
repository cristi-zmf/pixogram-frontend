import {Component} from '@angular/core';
import {CurrentUserService} from "./login/current-user.service";
import {LoginService} from "./login/login.service";
import {NgxPermissionsService} from "ngx-permissions";
import {Role} from "./authorities/role.enum";
import {AuthentifiedUser} from "./login/authentified-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isLoggedIn : boolean;
  private userRole: string = Role.USER;
  private loginUrl: string = '/login';
  private currentUser: AuthentifiedUser;

  constructor(private loginService: LoginService, private currentUserService: CurrentUserService, private permissionService: NgxPermissionsService) {
    this.isLoggedIn = this.currentUserService.isAuthenticated();
    this.loadAuthenticationContext();
    this.loginService.watchLogin().subscribe(
      () => {
        this.isLoggedIn = this.currentUserService.isAuthenticated();
        this.permissionService.flushPermissions();
        this.loadAuthenticationContext();
        console.log(this.permissionService.getPermissions());
      }
    )
  }


  private loadAuthenticationContext() {
    if (this.isLoggedIn) {
      this.currentUser = this.currentUserService.getCurrentUser();
      this.permissionService.loadPermissions([this.currentUser.role.valueOf().valueOf(), Role.LOGGED]);
    }
  }

  hasPermission (permission: string): boolean {
    return !!this.permissionService.getPermission(permission);
  }

  getUrlForUserProfile(): string {
    return this.currentUser ? `/user/view/${this.currentUser.username}` : this.loginUrl;
  }

  logout() {
    this.loginService.logout();
    this.permissionService.flushPermissions();
    this.currentUser = null;
  }

  getUrlForHome(): string {
    if (this.currentUser) {
          return this.getUrlForUserProfile();
    } else {
      return this.loginUrl;
    }
  }

  getUrlForUserGallery() {
    return this.currentUser ? `/user/image/${this.currentUser.username}` : this.loginUrl;
  }
}
