import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ImageService} from "../image.service";
import {ImageSummary} from "../image-summary";
import {ImageIdentificationInfoUpdateCommand} from "./image-identification-info-update-command";
import {Subscription} from "rxjs";
import {CommentDetails} from "../../comment/comment-details";
import {CommentService} from "../../comment/comment.service";
import {AddCommentCommand} from "../../comment/add-comment-command";
import {CurrentUserService} from "../../login/current-user.service";
import {AuthentifiedUser} from "../../login/authentified-user";
import {ShowLikesDislikesDetailsService} from "../show-likes-dislikes-details.service";

@Component({
  selector: 'app-user-image-details',
  templateUrl: './user-image-details.component.html',
  styleUrls: ['./user-image-details.component.css']
})
export class UserImageDetailsComponent implements OnInit, OnDestroy {
  private imageId: string;
  private imageSummary: ImageSummary;
  private comments: Array<CommentDetails>;
  private newComment: string;
  private currentCommentToEdit: CommentDetails;
  private copyOfUneditedComment: CommentDetails;
  private readOnly: boolean = true;
  private newTitle: string;
  private newDescription: string;
  private currentUser: AuthentifiedUser;
  private readonly mySubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, private imageService: ImageService, private router: Router,
    private commentService: CommentService, private currentUserService: CurrentUserService,
    private showLikesDislikesDetailsService: ShowLikesDislikesDetailsService
  ) {
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
    this.currentUser = this.currentUserService.getCurrentUser();
    this.loadImage();
  }

  private loadImage() {
    this.imageId = this.activatedRoute.snapshot.params['id'];
    this.imageService.getImageSummary(this.imageId).subscribe(data => {
      this.imageSummary = new ImageSummary(data);
      this.newDescription = this.imageSummary.description;
      this.imageSummary.comments.push("first comment");
      this.loadComments();
    });
  }

  private loadComments() {
    this.commentService.listComments(this.imageSummary.id).subscribe((data: Array<any>) => {
      this.comments = data.map(e => CommentDetails.fromJson(e));
    })
  }

  addComment() {
    this.imageSummary.comments.push(this.newComment);
    let addCommentCommand: AddCommentCommand = new AddCommentCommand(this.newComment, this.currentUser.username, this.imageSummary.id);
    this.commentService.addComment(addCommentCommand).subscribe(answer => {
      this.reloadComponent();
      this.newComment = '';
    });
  }

  canEdit(): boolean {
    return this.currentUser.username === this.imageSummary.owner && this.readOnly;
  }

  deleteComment(comment: CommentDetails) {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.reloadComponent();
    });
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
      () => {
        this.readOnly = true;
        this.setNewIdentificationInfoValidatedFromBackend();
      }
    );
  }

  private setNewIdentificationInfoValidatedFromBackend() {
    this.imageService.getImageSummary(this.imageSummary.id).subscribe(data => {
      let imageSummaryFromBackend = new ImageSummary(data);
      this.imageSummary.updateIdentificationInfoFromOtherSummary(imageSummaryFromBackend);
    });
  }

  cancelModifications() {
    this.readOnly = true;
    this.reloadComponent();
  }

  private reloadComponent() {
    this.router.navigate([`user/image-details/${this.imageSummary.id}`]);
  }

  private commentAuthorIsLoggedUser(comment: CommentDetails): boolean {
    return comment.author === this.currentUser.username;
  }

  updateDescription(value: any) {
    this.newDescription = value;
  }

  isEmptyString(value: string) {
    return !value || '' === value;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  enterEditComment(comment: CommentDetails) {
    this.currentCommentToEdit = comment;
    this.copyOfUneditedComment = CommentDetails.clone(comment);
    this.currentCommentToEdit.enableEditMode();
  }

  saveCommentModification(comment: CommentDetails) {
    this.commentService.editComment(comment.generateEditCommand()).subscribe(() => {
      comment.disableEditMode();
      this.copyOfUneditedComment = null;
    });
  }

  cancelEditOfComment(comment: CommentDetails) {
    comment.disableEditMode();
    comment.value = this.copyOfUneditedComment.value;
    this.copyOfUneditedComment = null;
  }


  like(comment: CommentDetails) {
    this.commentService.likeComment(comment.generateLikeDislikeCommand(this.currentUser.username)).subscribe(() => {
      this.reloadLikesDislikes(comment);
    });
  }

  dislike(comment: CommentDetails) {
    this.commentService.dislikeComment(comment.generateLikeDislikeCommand(this.currentUser.username
    )).subscribe(() => {
      this.reloadLikesDislikes(comment);
    });
  }

  showCommentLikesDetails(comment: CommentDetails) {
    this.showLikesDislikesDetailsService.showLikesOrDislikesDetails(comment.likes);
  }

  showCommentDislikesDetails(comment: CommentDetails) {
    this.showLikesDislikesDetailsService.showLikesOrDislikesDetails(comment.dislikes);
  }

  private reloadLikesDislikes(comment: CommentDetails) {
    this.commentService.consultComment(comment.id).subscribe(consultedCommentJson => {
      let refreshedComment: CommentDetails = CommentDetails.fromJson(consultedCommentJson);
      comment.likes = refreshedComment.likes;
      comment.dislikes = refreshedComment.dislikes
    });
  }
}
