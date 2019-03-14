import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MentorService} from "./mentor.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {LoginService} from "../login/login.service";
import {MentorForm} from "./mentor-form";

const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  private mentorForm = new MentorForm();
  private mode: string;
  private mentorAddressFromUrl: string;
  private mentorAddressBeforeEdit: string;
  constructor(
    private toastrService: ToastrService, private mentorService: MentorService,
    private route: ActivatedRoute, private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      routeParams => {
        this.mentorForm = new MentorForm();
        this.mode = routeParams['mode'];
        this.mentorAddressFromUrl = routeParams['id'];
        this.handleFormDataAccordingToComponentMode();
      }
    );
  }

  private handleFormDataAccordingToComponentMode() {
    if (this.mode === 'view' || this.mode === 'edit') {
      this.mentorAddressBeforeEdit = this.mentorAddressFromUrl;
      this.mentorService.getMentor(this.mentorAddressFromUrl).subscribe(
        mentorData => {
          this.setFormWithMentorData(mentorData);
          this.mentorForm.removePasswordControlForViewAndEdit();
        }
      );
      console.log(this.mentorForm);
    } if (this.mode ==='view') {
      this.mentorForm.disable();
    }
  }

  private setFormWithMentorData(mentorData: any) {
    this.mentorForm.setFormFromDto(mentorData);
  }

  onSubmit() {
    console.log("facem si asta, nu stiu de ce");
    this.mentorService.registerMentor(this.mentorForm.value).subscribe(
      (response: HttpResponse<any>) => {
        this.toastrService.success(response.body, "Registration successful");
        console.log(response);
        this.loginService.login(<string> this.mentorForm.get('username').value, <string> this.mentorForm.get('password').value);
      }
    );
  }

  shouldShowError(form: AbstractControl): boolean {
    return form.invalid && (form.dirty || form.touched);
  }

  saveModifications() {
    console.log("facem update");
    this.mentorService.updateMentor(this.mentorForm.value).subscribe(
      id => this.router.navigate([`mentor/view/${id}`])
    );
  }

  enterEditMode() {
    this.router.navigate([`mentor/edit/${this.mentorForm.get('username').value}`]);
  }

  cancelEdit() {
    this.router.navigate([`mentor/view/${this.mentorAddressBeforeEdit}`]);
  }
}
