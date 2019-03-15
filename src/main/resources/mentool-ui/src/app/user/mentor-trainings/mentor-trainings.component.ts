import {Component, OnInit} from '@angular/core';
import {TrainingService} from "../../training/training.service";
import {CurrentUserService} from "../../login/current-user.service";
import {MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mentor-trainings',
  templateUrl: './mentor-trainings.component.html',
  styleUrls: ['./mentor-trainings.component.css']
})
export class MentorTrainingsComponent implements OnInit {
  private dataSource: MatTableDataSource<any>;
  private displayedColumns: string[] = ['skillName', 'mentorName', 'facilitiesDesc', 'fee', 'startDate', 'endDate'];

  constructor(
    private trainingsService: TrainingService, private currentUserService: CurrentUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.trainingsService.getMentorTrainings(this.currentUserService.getCurrentUser().username).subscribe(
      data => this.dataSource = new MatTableDataSource(data)
    )
  }

  navigateToTrainingCreation() {
    this.router.navigate(['trainings/create']);
  }
}
