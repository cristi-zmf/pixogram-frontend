import {Component, OnInit, ViewChild} from '@angular/core';
import {forkJoin} from "rxjs";
import {UploadFileService} from "../upload-file.service";
import {CurrentUserService} from "../../login/current-user.service";

@Component({
  selector: 'app-user-image-upload',
  templateUrl: './user-image-upload.component.html',
  styleUrls: ['./user-image-upload.component.css']
})
export class UserImageUploadComponent implements OnInit {

  @ViewChild('file') file;

  public files: Set<File> = new Set();

  constructor(public uploadService: UploadFileService, private currentUserService: CurrentUserService) {}

  ngOnInit() {}

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        console.log("ajungem aici");
        console.log(files[key]);
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog


    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    let username: string = this.currentUserService.getCurrentUser().username;
    let uploadCommand: FormData = new FormData();
    console.log(this.files.values().next().value);
    uploadCommand.append("username", username);
    uploadCommand.append("multipartFile", this.files.values().next().value);

    this.progress = this.uploadService.upload(uploadCommand);
    console.log(this.progress);
    // for (const key in this.progress) {
    //   this.progress[key].progress.subscribe(val => console.log(val));
    // }

    this.progress.subscribe(val => console.log(val));

    // convert the progress map into an array
    // let allProgressObservables = [];
    // for (let key in this.progress) {
    //   allProgressObservables.push(this.progress[key].progress);
    // }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
