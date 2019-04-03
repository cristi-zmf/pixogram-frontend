import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ImageService} from "../image.service";
import {ImageSummary} from "../image-summary";
import {ImageIdentificationInfoUpdateCommand} from "./image-identification-info-update-command";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-image-details',
  templateUrl: './user-image-details.component.html',
  styleUrls: ['./user-image-details.component.css']
})
export class UserImageDetailsComponent implements OnInit, OnDestroy {
  private imageId: string;
  private imageSummary: ImageSummary;
  private newComment: string;
  private readOnly: boolean = true;
  private newTitle: string;
  private newDescription: string;
  private readonly mySubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.loadImage();
  }

  private loadImage() {
    this.imageId = this.activatedRoute.snapshot.params['id'];
    this.imageService.getImageSummary(this.imageId).subscribe(data => {
      this.imageSummary = new ImageSummary(data);
      this.newDescription = this.imageSummary.description;
      this.imageSummary.comments.push("first comment");
    });
  }

  addComment() {
    this.imageSummary.comments.push(this.newComment);
    this.newComment = '';
  }

  enterEditMode() {
    this.readOnly = false;
    this.newTitle = this.imageSummary.title;
    this.newDescription = this.imageSummary.description;
  }

  updateIdentificationInfo() {
    let updateCommand: ImageIdentificationInfoUpdateCommand = {
      title: this.newTitle,
      description: this.newDescription,
      imageId: this.imageSummary.id,
      owner: this.imageSummary.owner
    };
    this.imageService.updateImageIdentificationInfo(updateCommand).subscribe(
      answer => {
        this.readOnly = true;
        this.router.navigate([`user/image-details/${answer}`]);
      }
    );
  }

  cancelModifications() {
    this.readOnly = true;
    this.router.navigate([`user/image-details/${this.imageSummary.id}`]);
  }

  updateDescription(value: any) {
    this.newDescription = value;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
