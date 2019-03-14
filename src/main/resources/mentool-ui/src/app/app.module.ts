import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthoritiesComponent} from './authorities/authorities.component';
import {JwtInterceptorService} from "./jwt-interceptor.service";
import {UserRegistrationComponent} from './user/registration/user-registration.component';
import {UserConsultComponent} from './user/consult/user-consult.component';
import {TrainingSearchComponent} from './training/training-search.component';
import {SkillPickerComponent} from './skill/skill-picker.component';
import {ToastrHttpInterceptorService} from "./toastr-http-interceptor.service";
import {ToastrModule} from "ngx-toastr";
import {DatepickerComponent} from './datepicker/datepicker.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MentorComponent} from './mentor/mentor.component';
import {RequiredComponent} from './shared/required.component';
import {NgxPermissionsModule} from "ngx-permissions";
import {AdminComponent} from './admin/admin.component';
import {DialogComponent} from './shared/dialog/dialog.component';
import {TrainingDetailsComponent} from './training/training-details/training-details.component';
import {TrainingsListComponent} from "./shared/trainings/trainings-list.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MentorTrainingsComponent } from './mentor/mentor-trainings/mentor-trainings.component';
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatMomentDatetimeModule} from "@mat-datetimepicker/moment";
import {MomentDateModule} from "@angular/material-moment-adapter";
import * as moment from 'moment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthoritiesComponent,
    UserRegistrationComponent,
    UserConsultComponent,
    TrainingSearchComponent,
    SkillPickerComponent,
    DatepickerComponent,
    MentorComponent,
    TrainingDetailsComponent,
    RequiredComponent,
    AdminComponent,
    DialogComponent,
    TrainingDetailsComponent,
    TrainingsListComponent,
    MentorTrainingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    MomentDateModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    FormsModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ToastrHttpInterceptorService, multi: true}
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
