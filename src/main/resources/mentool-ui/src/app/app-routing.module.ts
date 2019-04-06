import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {CustomRouteReuseStrategy} from "./custom-reuse-strategy";
import {NgxPermissionsGuard} from "ngx-permissions";
import {Role} from "./users/role.enum";
import {UserGalleryImageComponent} from "./user-gallery-image/user-gallery-image.component";
import {UserImageUploadComponent} from "./user/user-image-upload/user-image-upload.component";
import {UserImageDetailsComponent} from "./user-gallery-image/user-image-details/user-image-details.component";
import {UsersComponent} from "./users/users.component";
import {FollowingComponent} from "./following/following.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent, data: {permissions: {only: Role.LOGGED}}, canActivate: [NgxPermissionsGuard]},
  { path: 'following', component: FollowingComponent, data: {permissions: {only: Role.LOGGED}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/create', component: UserComponent, data: {permissions: {except: Role.LOGGED}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/image/:id', component: UserGalleryImageComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/upload', component: UserImageUploadComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/image-details/:id', component: UserImageDetailsComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/:mode/:id', component: UserComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},

  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, { useHash: true} // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy}
  ]
})


export class AppRoutingModule {

}
