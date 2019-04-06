import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {UserConsult} from "../../users/user";

@Component({
  selector: 'app-likes-dislikes-details-dialog',
  templateUrl: './likes-dislikes-details-dialog.component.html',
  styleUrls: ['./likes-dislikes-details-dialog.component.css']
})
export class LikesDislikesDetailsDialogComponent implements OnInit {
  dataSource: MatTableDataSource<UserConsult>;
  actualPaginator: MatPaginator;
  actualSort: MatSort;
  displayedColumns: string[] = ['email', 'firstName', 'lastName'];
  @ViewChild(MatSort) set sort(value: MatSort) {
    this.actualSort = value;
  };
  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    this.actualPaginator = value;
  };
  constructor(
    public dialogRef: MatDialogRef<LikesDislikesDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<UserConsult>) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    setTimeout(() => this.dataSource.paginator = this.actualPaginator);
    this.dataSource.sort = this.actualSort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
