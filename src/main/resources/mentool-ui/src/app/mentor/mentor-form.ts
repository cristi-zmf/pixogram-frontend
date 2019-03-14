import {FormControl, FormGroup, Validators} from "@angular/forms";
const urlPattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

export class MentorForm extends FormGroup{
  constructor() {
    super({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10,14}")]),
      yearsOfExperience: new FormControl('', [Validators.required]),
      linkedinUrl: new FormControl('', [Validators.pattern(urlPattern)])
    });
  }

  setFormFromDto(mentorData: any) {
    this.patchValue({
      username: mentorData.id,
      firstName: mentorData.firstName,
      lastName: mentorData.lastName,
      phoneNumber: mentorData.phoneNumber,
      yearsOfExperience: mentorData.yearsOfExperience,
      linkedinUrl: mentorData.linkedinUrl
    })
  }

  removePasswordControlForViewAndEdit() {
    this.removeControl('password');
  }
}
