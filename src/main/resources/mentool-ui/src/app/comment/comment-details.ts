import {EditCommentCommand} from "./edit-comment-command";

export class CommentDetails {
  public constructor(
    public id: string, public value: string, public author: string, public fullName: string,  public imageId: string,
    public likes: Array<string>, public dislikes: Array<string>, public lastModified: Date, public editMode: boolean
  ) {
    this.id = id;
    this.value = value;
    this.author = author;
    this.fullName = fullName;
    this.imageId = imageId;
    this.likes = likes;
    this.dislikes = dislikes;
    this.lastModified = lastModified;
  }

  public static fromJson(json: any): CommentDetails {
    return new CommentDetails(
      json.id, json.value, json.author, json.fullName, json.imageId, json.likes, json.dislikes, new Date(json.lastModified), false
    );
  }

  public static clone(clone: CommentDetails): CommentDetails {
    return new CommentDetails(
      clone.id, clone.value, clone.author, clone.fullName, clone.imageId, clone.likes, clone.dislikes, new Date(clone.lastModified), clone.editMode
    );
  }

  public isInEditMode(): boolean {
    return this.editMode;
  }

  public isNotInEditMode(): boolean {
    return !this.editMode;
  }

  public enableEditMode(): void {
    this.editMode = true;
  }

  public disableEditMode(): void {
    this.editMode = false;
  }

  public generateEditCommand(): EditCommentCommand {
    return new EditCommentCommand(this.id, this.value, this.author, this.imageId);
  }
}
