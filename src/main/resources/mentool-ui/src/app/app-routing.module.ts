import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {CustomRouteReuseStrategy} from "./custom-reuse-strategy";
import {NgxPermissionsGuard} from "ngx-permissions";
import {Role} from "./authorities/role.enum";
import {UserGalleryImageComponent} from "./user-gallery-image/user-gallery-image.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user/create', component: UserComponent, data: {permissions: {except: Role.LOGGED}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/image', component: UserGalleryImageComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},
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
