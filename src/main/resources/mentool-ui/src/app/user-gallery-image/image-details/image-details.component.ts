import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageSummary} from "../image-summary";
import {CurrentUserService} from "../../login/current-user.service";
import {ImageService} from "../image.service";
import {AuthentifiedUser} from "../../login/authentified-user";
import {ShowLikesDislikesDetailsService} from "../show-likes-dislikes-details.service";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  @Input()
  readOnly: boolean = true;

  @Input()
  imageSummary: ImageSummary;

  private currentUser: AuthentifiedUser;

  @Output()
  descriptionChange: EventEmitter<string> = new EventEmitter();

  constructor(
    public currentUserService: CurrentUserService, public imageService: ImageService,
    public showLikesDislikesDetailsService: ShowLikesDislikesDetailsService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  onInputChange(value: string) {
    this.descriptionChange.emit(this.imageSummary.description);
  }

  like(): void {
    let likeCommand = this.imageSummary.generateLikeDislikeCommand(this.currentUser);
    this.imageService.likeImage(likeCommand).subscribe(() => {
      this.refreshLikesDislikes();
    })
  }

  dislike(): void {
    let dislikeCommand = this.imageSummary.generateLikeDislikeCommand(this.currentUser);
    this.imageService.dislikeImage(dislikeCommand).subscribe(() => {
      this.refreshLikesDislikes();
    })
  }

  private refreshLikesDislikes() {
    this.imageService.getImageSummary(this.imageSummary.id).subscribe(dataFromBackend => {
      let summaryFromBackend: ImageSummary = new ImageSummary(dataFromBackend);
      this.imageSummary.updateLikesDislikeBaseOnSummary(summaryFromBackend);
    })
  }
  showDislikesDetails() {
    this.showLikesDislikesDetailsService.showLikesOrDislikesDetails(this.imageSummary.dislikes);
  }

  showLikesDetails() {
    this.showLikesDislikesDetailsService.showLikesOrDislikesDetails(this.imageSummary.likes);
  }
}
