import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user";
import {UserService} from "../registration/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TrainingService} from "../../training/training.service";
import {CurrentUserService} from "../../login/current-user.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-user-consult',
  templateUrl: './user-consult.component.html',
  styleUrls: ['./user-consult.component.css']
})
export class UserConsultComponent implements OnInit {
  @Input() user: User
  private closeResult: any;
  private dataSource: MatTableDataSource<any>;
  private displayedColumns: string[] = ['skillName', 'mentorName', 'facilitiesDesc', 'fee', 'startDate', 'endDate'];
  constructor(
    private userService: UserService, private modalService: NgbModal,
    private trainingService: TrainingService, private currentUserService: CurrentUserService
  ) { }

  submitted = false;
  readonly = true;

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (user: any) => {
        this.user = new User(user.id, null, user.firstName, user.lastName, user.phoneNumber);
        this.trainingService.getTrainingsBookedByUser(this.user.username).subscribe(
          data => this.dataSource = new MatTableDataSource(data)
        );
      }
    );

  }

  onSubmit() {
    this.submitted = true;
    this.userService.registerUser(this.user).subscribe(
      () => {
        this.readonly = true;
      }
    );
  }

  viewBookedBookings(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed: ${reason}`;
    });
  }
}
