import {AppSettings} from "../app-settings";
import {AuthentifiedUser} from "../login/authentified-user";
import {LikeDislikeCommand} from "../comment/like-dislike-command";

const baseUrl = window.location.origin;
export class ImageSummary {
  public fullImgUrl: string;
  public thumbnailUrl: string;
  public owner: string;
  public id: string;
  public title: string;
  public description: string;
  public comments: Array<string>;
  public likes: Array<string>;
  public dislikes: Array<string>;


  constructor(
    json: any
  ) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.owner = json.owner;
    this.comments = json.comments;
    this.likes = json.likes;
    this.dislikes = json.dislikes;
    this.fullImgUrl = `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/full-images/${this.id}`;
    this.thumbnailUrl = `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${this.id}`;
  }



  public static computeFullImgUrl(id: string): string {
    return `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/full-images/${id}`;
  }

  public static getThumbnailUrl(id: string): string {
    return `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${id}`;
  }

  public getFullImgUrl(): string {
    return `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/full-images/${this.id}`;
  }

  public getTitle(): string {
    if (!this.title || this.title === '') {
      return 'No title available';
    } else {
      return this.title;
    }
  }

  public getNumberOfLikes(): number {
    return this.likes.length;
  }

  // public getDislikes(): Array<string> {
  //   return new Array<string>(this.dislikes);
  // }
  //
  // public getLikes(): Array<string> {
  //   return new Array<string>(this.likes);
  // }


  public getNumberOfDislikes(): number {
    return this.dislikes.length;
  }

  public getThumbnailUrl(id: string): string {
    return `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${this.id}`;
  }

  public generateLikeDislikeCommand(author: AuthentifiedUser): LikeDislikeCommand {
    return new LikeDislikeCommand(this.id, author.username);
  }

  public updateIdentificationInfoFromOtherSummary(other: ImageSummary): void {
    this.description = other.description;
    this.title = other.title;
  }

  public updateLikesDislikeBaseOnSummary(other: ImageSummary) {
    this.likes = other.likes;
    this.dislikes = other.dislikes;
  }
}
