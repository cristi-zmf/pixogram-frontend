import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {CustomRouteReuseStrategy} from "./custom-reuse-strategy";
import {NgxPermissionsGuard} from "ngx-permissions";
import {Role} from "./authorities/role.enum";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user/view', component: UserComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/edit', component: UserComponent, data: {permissions: {only: Role.USER}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/create', component: UserComponent, data: {permissions: {except: Role.LOGGED}}, canActivate: [NgxPermissionsGuard]},
  { path: 'user/:mode', component: UserComponent},
  { path: 'user/:mode/:id', component: UserComponent},
  { path: 'user/:mode/:id', component: UserComponent},
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
