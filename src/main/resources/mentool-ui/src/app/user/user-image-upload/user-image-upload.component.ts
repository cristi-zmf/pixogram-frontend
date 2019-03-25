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

  public fileUploadCommands: Set<{file: File, title: string, description: string}> = new Set();

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
        let fileUpload = this.initializeFileUploadCommand(files, key);
        this.fileUploadCommands.add(fileUpload);
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
    let uploadCommands: Array<FormData> = new Array<FormData>();
    this.fileUploadCommands.forEach((fileUploadCommand) => {
      const imageDetailsJson = this.prepareImageDetails(username, fileUploadCommand);
      let uploadCommand = this.prepareUploadCommand(fileUploadCommand, imageDetailsJson);
      uploadCommands.push(uploadCommand);
    });



    this.progress = this.uploadService.upload(uploadCommands);
    console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    this.progress.subscribe(val => console.log(val));

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

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

  private prepareImageDetails(username: string, fileUploadCommand) {
    let imageDetails: any = {};
    imageDetails.username = username;
    imageDetails.imageTitle = fileUploadCommand.title;
    imageDetails.imageDescription = fileUploadCommand.description;
    const imageDetailsJson = JSON.stringify(imageDetails);
    return imageDetailsJson;
  }

  private prepareUploadCommand(fileUploadCommand, imageDetailsJson) {
    let uploadCommand: FormData = new FormData();
    uploadCommand.append('multipartFile', fileUploadCommand.file);
    uploadCommand.append("imageDetails", imageDetailsJson);
    uploadCommand.append("filename", fileUploadCommand.file.name);
    return uploadCommand;
  }

  private initializeFileUploadCommand(files: { [p: string]: File }, key) {
    let fileUpload: { file: File, title: string, description: string } = {
      file: files[key],
      title: '',
      description: ''
    };
    return fileUpload;
  }
}
