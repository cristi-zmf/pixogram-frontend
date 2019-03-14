import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  model = new User(
    '', '', '', '', ''
  );

  submitted = false;
  readonly = false;

  onSubmit() {
    this.submitted = true;
    this.userRegistration.registerUser(this.model).subscribe(
      () => {
        this.readonly = true;
      }
    );
  }
  constructor(private userRegistration: UserService) {
  }

  ngOnInit() {
  }

  enterEditMode() {
    this.readonly=false;
  }
}
