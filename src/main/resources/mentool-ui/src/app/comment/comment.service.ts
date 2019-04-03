import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app-settings";
import {AddCommentCommand} from "./add-comment-command";
import {EditCommentCommand} from "./edit-comment-command";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {}

  public addComment(addCommentCommand: AddCommentCommand): Observable<any> {
    return this.httpClient.post(`${AppSettings.IMAGES_API_PREFIX}/add-comment`, addCommentCommand);
  }

  public editComment(editCommentCommand: EditCommentCommand): Observable<any> {
    return this.httpClient.put(`${AppSettings.IMAGES_API_PREFIX}/edit-comment`, editCommentCommand);
  }
  public deleteComment(commentId: string): Observable<any> {
    return this.httpClient.delete(`${AppSettings.IMAGES_API_PREFIX}/delete-comment/${commentId}`);
  }

  public listComments(imageId: string): Observable<any> {
    return this.httpClient.get(`${AppSettings.API_PREFIX}/${imageId}/comments`);
  }
}
