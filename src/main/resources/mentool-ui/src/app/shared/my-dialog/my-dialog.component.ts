import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {ImageSummary} from "../../user-gallery-image/image-summary";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  constructor(
    public thisDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public imageSummary: ImageSummary,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(this.imageSummary.getFullImgUrl());
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  openImageDetails() {
    this.router.navigate([`user/image-details/${this.imageSummary.id}`]);
    this.thisDialogRef.close();
  }
}
