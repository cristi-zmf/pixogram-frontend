import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserConsult} from "../users/user";
import {AuthentifiedUser} from "../login/authentified-user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UsersService} from "../users/users.service";
import {CurrentUserService} from "../login/current-user.service";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

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
    this.userService.listFollowing().subscribe(
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

  unfollow(element: UserConsult) {
    this.userService.unfollowUser(element.generateFollowUnfollowCommand(this.currentUserAddress)).subscribe(() =>{
      this.refreshFollowingList();
    });
  }

  private refreshFollowingList() {
    this.refreshData()
  }

  followsNoOne() {
    return !this.dataSource || this.dataSource.data.length === 0;
  }
}
