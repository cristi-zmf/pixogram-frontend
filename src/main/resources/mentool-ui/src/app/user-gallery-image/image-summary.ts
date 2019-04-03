import {AppSettings} from "../app-settings";

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

  public getThumbnailUrl(id: string): string {
    return `${baseUrl}/${AppSettings.IMAGES_API_PREFIX}/thumbnails/${this.id}`;
  }
}
