import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {LikesDislikesDetailsDialogComponent} from "./likes-dislikes-details-dialog/likes-dislikes-details-dialog.component";
import {UserConsult} from "../users/user";
import {UsersService} from "../users/users.service";
import {ListByEmailsCommand} from "./list-by-emails-command";

@Injectable({
  providedIn: 'root'
})
export class ShowLikesDislikesDetailsService {

  constructor(public userService: UsersService, public dialog: MatDialog) {}

  public showLikesOrDislikesDetails(addresses: Array<string>) {
    let listByEmailsCommand: ListByEmailsCommand = new ListByEmailsCommand(addresses);
    this.userService.listByAddresses(listByEmailsCommand).subscribe((data: Array<any>)=> {
        let usersDetails: Array<UserConsult> = data.map(e => {return UserConsult.fromJson(e)});
        this.openDialog(usersDetails);
    });
  }

  private openDialog(usersData: Array<UserConsult>): void {
    const dialogRef = this.dialog.open(LikesDislikesDetailsDialogComponent, {
      width: '700px',
      data: usersData
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
