import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatRow, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingSearchResult} from "./training-search-result";
import {TrainingService} from "./training.service";
import {TrainingSearchRequest} from "./training-search-request";
import {Skill} from "../skill/skill";
import {Router} from "@angular/router";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


@Component({
  selector: 'app-training',
  templateUrl: './training-search.component.html',
  styleUrls: ['./training-search.component.css']
})
export class TrainingSearchComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'skillName', 'yearsOfExperience'];
  dataSource: MatTableDataSource<TrainingSearchResult>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private selectedSkillName: string = null;
  private selectedStartDate: string = null;
  private selectedEndDate: string = null;
  constructor(private trainingService: TrainingService, private router: Router) {
    trainingService.searchTrainings(
      new TrainingSearchRequest(this.selectedSkillName, this.selectedStartDate, this.selectedEndDate)).subscribe(
      (results: Array<TrainingSearchResult>) => {
        this.dataSource = new MatTableDataSource(results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  doSearch(skillSelected: Skill) {
    this.selectedSkillName = !skillSelected ? null : skillSelected.skillName;
    this.callSearchService()
  }

  performSearchWithStartDate(startDateFromPicker: any) {
    this.selectedStartDate = this.getUpdatedDateInISOFormat(startDateFromPicker);
    this.callSearchService();
  }


  performSearchWithEndDate(endDateFromPicker: any) {
    this.selectedEndDate = this.getUpdatedDateInISOFormat(endDateFromPicker);
    this.callSearchService();
  }

  private getUpdatedDateInISOFormat(date: any): string {
    return !date ? null : new Date(date).toISOString().replace('Z', '');
  }

  private callSearchService() {
    this.trainingService.searchTrainings(
      new TrainingSearchRequest(this.selectedSkillName, this.selectedStartDate, this.selectedEndDate)
    ).subscribe(
      (results: Array<TrainingSearchResult>) => this.updateTable(results)
    )
  }
  private updateTable(results: Array<TrainingSearchResult>) {
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToTrainingDetails(row: any) {
    this.router.navigate([`trainings/view/${row.trainingId}`]);
  }
}

