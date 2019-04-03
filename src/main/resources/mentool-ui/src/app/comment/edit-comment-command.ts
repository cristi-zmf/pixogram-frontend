export class EditCommentCommand {
  public constructor(public id: string, public value: string, public author: string, public imageId: string) {
    this.value = value;
    this.author = author;
    this.imageId = imageId;
  }
}
