import {Component, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserService} from "./user.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../login/login.service";
import {UserForm} from "./user-form";
import {CurrentUserService} from "../login/current-user.service";

const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private userForm = new UserForm();
  private mode: string;
  private isLoggedIn: boolean;
  private userAddressFromUrl: string;
  private userAddressBeforeEdit: string;
  constructor(
    private toastrService: ToastrService, private userService: UserService,
    private route: ActivatedRoute, private loginService: LoginService, private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.currentUserService.isAuthenticated();
    this.route.params.subscribe(
      routeParams => {
        this.userForm = new UserForm();
        this.mode = routeParams['mode'];
        this.userAddressFromUrl = routeParams['id'];
        this.handleFormDataAccordingToComponentMode();
        console.log(this.mode);
      }
    );
  }

  private handleFormDataAccordingToComponentMode() {
    if (this.mode === 'view' || this.mode === 'edit') {
      this.userAddressBeforeEdit = this.userAddressFromUrl;
      this.userService.getUser(this.userAddressFromUrl).subscribe(
        userData => {
          this.setFormWithUserData(userData);
          this.userForm.removePasswordControlForViewAndEdit();
          this.userForm.disableUsername();
        }
      );
      console.log(this.userForm);
    } if (this.mode ==='view') {
      this.userForm.disable();
    }
  }

  private setFormWithUserData(userData: any) {
    this.userForm.setFormFromDto(userData);
  }

  onSubmit() {
    this.userService.registerUser(this.userForm.value).subscribe(
      (response: HttpResponse<any>) => {
        this.toastrService.success(response.body, "Registration successful");
        console.log(response);
        this.loginService.login(<string> this.userForm.get('username').value, <string> this.userForm.get('password').value);
      }
    );
  }

  shouldShowError(form: AbstractControl): boolean {
    return form.invalid && (form.dirty || form.touched);
  }

  saveModifications() {
    this.userService.editUser(this.userForm.generateEditCommand()).subscribe(
      id => this.router.navigate([`user/view/${id.value}`])
    );
  }

  enterEditMode() {
  console.log(this.userForm.getUsername());
    this.router.navigate([`user/edit/${this.userForm.getUsername()}`]);
  }

  cancelEdit() {
    this.router.navigate([`user/view/${this.userAddressBeforeEdit}`]);
  }
}
