import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Authority} from "./authority";
import {Router} from "@angular/router";
import {AuthoritiesService} from "./authorities.service";

@Component({
  selector: 'app-authorities',
  templateUrl: './authorities.component.html',
  styleUrls: ['./authorities.component.css']
})
export class AuthoritiesComponent implements OnInit {
  dataSource: Authority[] = [];
  displayedColumns: string[] = ['email', 'role', 'isNotLocked'];
  dataIsAvailable: boolean = false;
  selectedRow: any = null;

  constructor(private http: HttpClient, private router: Router, private authorityService: AuthoritiesService) {
    this.http = http;
    this.router = router;
  }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    this.authorityService.getAuthorities().subscribe(
      (authorities: Authority[]) => {
        this.dataSource = authorities;
        this.dataIsAvailable = true;
        this.selectedRow = null;
      }
    );
  }

  enableLockButtons(row) {
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
    this.authorityService.lockAuthority(this.selectedRow.email).subscribe(
      () => this.refreshData()
    )
  }

  unlockSelectedUser() {
    this.authorityService.unlockAuthority(this.selectedRow.email).subscribe(
      () => this.refreshData()
    )
  }
}
