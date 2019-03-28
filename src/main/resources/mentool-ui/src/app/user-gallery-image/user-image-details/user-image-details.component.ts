import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {ImageService} from "../image.service";
import {ImageSummary} from "../image-summary";

@Component({
  selector: 'app-user-image-details',
  templateUrl: './user-image-details.component.html',
  styleUrls: ['./user-image-details.component.css']
})
export class UserImageDetailsComponent implements OnInit {
  private imageId: string;
  private imageSummary: ImageSummary;
  private newComment: string;

  constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService) {}

  ngOnInit() {
    this.imageId = this.activatedRoute.snapshot.params['id'];
    this.imageService.getImageSummary(this.imageId).subscribe(data => {
      this.imageSummary = new ImageSummary(data);
      this.imageSummary.comments.push("first comment");
    });
  }

  addComment() {
    this.imageSummary.comments.push(this.newComment);
    this.newComment = '';
  }
}
