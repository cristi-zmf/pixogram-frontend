import {Component, OnInit} from '@angular/core';
import {TrainingForm} from "./training-form";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../login/login.service";
import {AbstractControl} from "@angular/forms";
import {CurrentUserService} from "../../login/current-user.service";
import {Role} from "../../authorities/role.enum";
import {TrainingService} from "../training.service";
import {Skill} from "../../skill/skill";
import {MentorService} from "../../mentor/mentor.service";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  private trainingForm = new TrainingForm();
  private mode: string;
  private trainingIdFromUrl: string;
  private roleOfUser: string;
  private traineesBooked: Array<string>;
  private bookingMessage: string;

  constructor(
    private toastrService: ToastrService, private trainingService: TrainingService,
    private route: ActivatedRoute, private loginService: LoginService,
    private currentUserService: CurrentUserService, mentorService: MentorService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      routeParams => {
        this.trainingForm = new TrainingForm();
        this.mode = routeParams['mode'];
        this.trainingIdFromUrl = routeParams['id'];
        this.handleFormDataAccordingToComponentMode();
        this.roleOfUser = this.currentUserService.isAuthenticated() ?
          this.currentUserService.getCurrentUser().role : null;
      }
    );
  }

  private handleFormDataAccordingToComponentMode() {
    if (this.mode === 'view' || this.mode === 'edit') {
      this.trainingService.getTrainingDetails(this.trainingIdFromUrl).subscribe(
        trainingData => {
          this.trainingForm.setFormFromDto(trainingData);
          this.traineesBooked = this.trainingForm.getTraineesBooked();
          this.handleBookingMessageIfUser();
        }
      );
    } if (this.mode ==='view') {
      this.trainingForm.disable();
    }
  }

  private handleBookingMessageIfUser() {
    if (this.hasUserRole()) {
      if (this.isBookedByCurrentUser()) {
        this.bookingMessage = "You have booked this training!";
      } else {
        this.bookingMessage = "You are not booked for this training!";
      }
    }
  }

  isBookedByCurrentUser(): boolean {
    if (this.traineesBooked) {
      return this.traineesBooked.indexOf(this.currentUserService.getCurrentUser().username) >= 0;
    } else {
      return false;
    }
  }

  shouldShowError(form: AbstractControl): boolean {
    return form.invalid && (form.dirty || form.touched);
  }

  hasUserRole(): boolean {
    return Role.USER === this.roleOfUser;
  }

  bookTraining() {
    let bookingCommand = this.getBookingCommand();
    this.trainingService.bookTraining(bookingCommand).subscribe(
      (booked: boolean )=> {
        this.handleBookingToastrMessage(booked);
        this.handleFormDataAccordingToComponentMode();
      }
    )
  }

  cancelBookingTraining() {
    let bookingCommand = this.getBookingCommand();
    this.trainingService.cancelBookingTraining(bookingCommand).subscribe(
      (cancelledBooking: boolean )=> {
        this.handleBookingCancellationToastMessage(cancelledBooking);
        this.handleFormDataAccordingToComponentMode();
      }
    )
  }

  private handleBookingToastrMessage(booked: boolean) {
    if (booked) {
      this.toastrService.success('Training was booked!', 'Success');
    } else {
      this.toastrService.error('Training could not be booked because there are no more spots left!', 'Failure');
    }
  }

  private getBookingCommand() {
    let bookingCommand: any = {};
    bookingCommand.trainingId = this.trainingForm.getTrainingId();
    bookingCommand.traineeEmail = this.currentUserService.getCurrentUser().username;
    return bookingCommand;
  }

  hasAdminRole() {
    return Role.ADMIN === this.roleOfUser;
  }

  hasMentorRole() {
    return Role.MENTOR === this.roleOfUser;
  }

  private handleBookingCancellationToastMessage(canceledBooking: boolean) {
    if (canceledBooking) {
      this.toastrService.success(
        'Booking was successfully cancelled!' +
        ' Depending on the progress of the training a fraction of the tax fee might have been billed.',
        'Success'
      );
    } else {
      this.toastrService.error('Training could not be cancelled. Please try again later!', 'Failure');
    }
  }

  shouldDisplayBookButton() {
    return this.hasUserRole() && !this.isBookedByCurrentUser();
  }

  shouldDisplayCancelBookingButton() {
    return this.hasUserRole() && this.isBookedByCurrentUser();
  }

  shouldDisplayUsersThatBookedTheTraining() {
    return this.hasMentorRole() && !this.isCreateMode();
  }

  private isCreateMode() {
    return this.mode === 'create';
  }

  fillSkillField(selectedSkill: Skill) {
    this.trainingForm.updateSkillField(selectedSkill);
  }

  fillFormWithStartDate(date: any) {
    this.trainingForm.updateStartDate(date);
  }

  fillFormWithEndDate(date: any) {
    this.trainingForm.updateEndDate(date);
  }
}
