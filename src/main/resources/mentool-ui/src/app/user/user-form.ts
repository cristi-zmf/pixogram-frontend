import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "./user";
import {UserEditCommand} from "./user-edit-command";
const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

export class UserForm extends FormGroup{
  constructor() {
    super({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  public setFormFromDto(userData: any) {
    this.patchValue({
      username: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    })
  }

  public getCreationDto(): User {
    return new User(this.getUsername(), this.getPassword(), this.getFirstName(), this.getLastName());
  }

  public getUsername(): string {
    return this.getUsernameFormControl().value;
  }

  public getPassword(): string {
    return this.get("password").value;
  }

  public getFirstName(): string {
    return this.get("firstName").value;
  }

  public getLastName(): string {
    return this.get("lastName").value;
  }

  public generateEditCommand(): UserEditCommand {
    return new UserEditCommand(this.getFirstName(), this.getLastName());
  }

  public disableUsername(): void {
    this.getUsernameFormControl().disable();
  }

  removePasswordControlForViewAndEdit() {
    this.removeControl('password');
  }

  private getUsernameFormControl(): AbstractControl {
    return this.get("username");
  }
}
