import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserConsult} from "./user";
import {Router} from "@angular/router";
import {UsersService} from "./users.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {CurrentUserService} from "../login/current-user.service";
import {AuthentifiedUser} from "../login/authentified-user";

@Component({
  selector: 'app-authorities',
  templateUrl: './users.component.html',
  styleUrls: ['./user.component.css']
})
export class UsersComponent implements OnInit {
  actualPaginator: MatPaginator;
  actualSort: MatSort;
  @ViewChild(MatSort) set sort(value: MatSort) {
    this.actualSort = value;
  };
  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    this.actualPaginator = value;
  };

  dataSource: MatTableDataSource<UserConsult>;
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'subscribed'];
  dataIsAvailable: boolean = false;
  selectedRow: any = null;
  currentUser: AuthentifiedUser;
  currentUserAddress: string;



  constructor(
    private http: HttpClient, private router: Router,
    private userService: UsersService, private currentUserService: CurrentUserService
  ) {
    this.http = http;
    this.router = router;
  }


  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    this.currentUser = this.currentUserService.getCurrentUser();
    this.currentUserAddress = this.currentUser.username;
    this.userService.getUsers().subscribe(
      (usersFromBack: [any]) => {
        const userConsults = usersFromBack.map(e => {return UserConsult.fromJson(e)});
        this.dataSource = new MatTableDataSource(userConsults);
        setTimeout(() => this.dataSource.paginator = this.actualPaginator);
        this.dataSource.sort = this.actualSort;
        this.dataIsAvailable = true;
        this.selectedRow = null;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewUserGallery(row: UserConsult) {
    this.router.navigate([`user/image/${row.email}`]);
    this.selectedRow = row;
  }

  alreadyLocked(): boolean {
    console.log(!this.selectedRow);
    if (this.selectedRow) {
      return !this.selectedRow.isNotLocked;
    }
    else {
      return true;
    }
  }

  alreadyUnlocked() {
    if (this.selectedRow) {
      return this.selectedRow.isNotLocked;
    } else {
      return true;
    }
  }

  lockSelectedUser() {
    this.userService.lockAuthority(this.selectedRow.email).subscribe(
      () => this.refreshData()
    )
  }

  unlockSelectedUser() {
    this.userService.unlockAuthority(this.selectedRow.email).subscribe(
      () => this.refreshData()
    )
  }

  follow(element: UserConsult) {
    this.userService.followUser(element.generateFollowUnfollowCommand(this.currentUserAddress)).subscribe(() =>{
      this.refreshUserElement(element);
    });
  }

  unfollow(element: UserConsult) {
    this.userService.unfollowUser(element.generateFollowUnfollowCommand(this.currentUserAddress)).subscribe(() =>{
      this.refreshUserElement(element);
    });
  }


  private refreshUserElement(element: UserConsult) {
    this.userService.getUser(element.email).subscribe((data: any) => {
      element.refreshSubscribed(UserConsult.fromJson(data));
    });
  }
}
