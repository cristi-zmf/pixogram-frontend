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
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UsersComponent} from './authorities/users.component';
import {JwtInterceptorService} from "./jwt-interceptor.service";
import {ToastrHttpInterceptorService} from "./toastr-http-interceptor.service";
import {ToastrModule} from "ngx-toastr";
import {DatepickerComponent} from './datepicker/datepicker.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {UserComponent} from './user/user.component';
import {RequiredComponent} from './shared/required.component';
import {NgxPermissionsModule} from "ngx-permissions";
import {DialogComponent} from './shared/dialog/dialog.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import {MatMomentDatetimeModule} from "@mat-datetimepicker/moment";
import {MomentDateModule} from "@angular/material-moment-adapter";
import {UserGalleryImageComponent} from './user-gallery-image/user-gallery-image.component';
import {MyDialogComponent} from "./shared/my-dialog/my-dialog.component";
import {UserImageUploadComponent} from './user/user-image-upload/user-image-upload.component';
import {ImageDetailsComponent} from './user-gallery-image/image-details/image-details.component';
import {UserImageDetailsComponent} from './user-gallery-image/user-image-details/user-image-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    DatepickerComponent,
    UserComponent,
    RequiredComponent,
    DialogComponent,
    MyDialogComponent,
    UserGalleryImageComponent,
    UserImageUploadComponent,
    ImageDetailsComponent,
    UserImageDetailsComponent
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
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
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
  entryComponents: [DialogComponent, MyDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
