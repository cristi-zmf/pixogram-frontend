import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthoritiesComponent} from "./authorities/authorities.component";
import {AuthGuardService} from "./login/auth-guard.service";
import {UserRegistrationComponent} from "./user/registration/user-registration.component";
import {UserConsultComponent} from "./user/consult/user-consult.component";
import {TrainingSearchComponent} from "./training/training-search.component";
import {MentorComponent} from "./mentor/mentor.component";
import {CustomRouteReuseStrategy} from "./custom-reuse-strategy";
import {NgxPermissionsGuard} from "ngx-permissions";
import {Role} from "./authorities/role.enum";
import {AdminComponent} from "./admin/admin.component";
import {TrainingDetailsComponent} from "./training/training-details/training-details.component";
import {MentorTrainingsComponent} from "./mentor/mentor-trainings/mentor-trainings.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user-registration', component: UserRegistrationComponent},
  { path: 'authorities', component: AuthoritiesComponent, data: {permissions: {only: Role.MENTOR}}, canActivate: [NgxPermissionsGuard, AuthGuardService]},
  { path: 'user-profile', component: UserConsultComponent, data: {permission: {only: Role.USER}}, canActivate: [AuthGuardService, NgxPermissionsGuard]},
  { path: 'mentor/view', component: MentorComponent, data: {permissions: {only: Role.MENTOR}}, canActivate: [NgxPermissionsGuard]},
  { path: 'mentor/edit', component: MentorComponent, data: {permissions: {only: Role.MENTOR}}, canActivate: [NgxPermissionsGuard]},
  { path: 'mentor/create', component: MentorComponent, data: {permissions: {except: Role.LOGGED}}, canActivate: [NgxPermissionsGuard]},
  { path: 'mentor/trainings', component: MentorTrainingsComponent, data: {permissions: {only: Role.MENTOR}}, canActivate: [NgxPermissionsGuard]},
  { path: 'mentor/:mode', component: MentorComponent},
  { path: 'mentor/:mode/:id', component: MentorComponent},
  { path: 'mentor/:mode/:id', component: MentorComponent},
  { path: 'trainings/:mode', component: TrainingDetailsComponent},
  { path: 'trainings/:mode/:id', component: TrainingDetailsComponent},
  { path: 'training-search', component: TrainingSearchComponent},
  { path: 'admin', component: AdminComponent, data: {permissions: {only: Role.ADMIN}}, canActivate: [NgxPermissionsGuard]},
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
