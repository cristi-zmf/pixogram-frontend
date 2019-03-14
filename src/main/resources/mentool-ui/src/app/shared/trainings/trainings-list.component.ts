import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() rowClickedEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() displayedColumns: string[] = ['skillName', 'mentorName', 'facilitiesDesc', 'fee', 'startDate', 'endDate'];
  @Input() dataSource: MatTableDataSource<any>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  goToTrainingDetails(row: any) {
    this.rowClickedEmitter.emit(true);
    this.router.navigate([`trainings/view/${row.trainingId}`]);
  }
}
