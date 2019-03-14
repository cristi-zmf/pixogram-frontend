import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainingSearchRequest} from "./training-search-request";
import {AppSettings} from "../app-settings";
const MENTORS_API = `${AppSettings.PERSONS_API_PREFIX}/mentors`;



@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private httpClient: HttpClient) { }

  public searchTrainings(searchRequest: TrainingSearchRequest): Observable<any> {
    return this.httpClient.post(`${MENTORS_API}/search`, searchRequest);
  }

  getTrainingDetails(trainingId: string): Observable<any> {
    return this.httpClient.get(`${MENTORS_API}/trainings/${trainingId}`);
  }

  bookTraining(bookingCommand: any): Observable<any> {
    return this.httpClient.put(`${AppSettings.PERSONS_API_PREFIX}/calendar/book`, bookingCommand);
  }

  cancelBookingTraining(bookingCommand: any): Observable<any> {
    return this.httpClient.put(`${AppSettings.PERSONS_API_PREFIX}/calendar/cancel-booking`, bookingCommand);
  }

  getTrainingsBookedByUser(userEmail: string): Observable<any> {
    userEmail = this.escapeEmailSpecialCharacter(userEmail);
    return this.httpClient.get(`${AppSettings.PERSONS_API_PREFIX}/calendar/${userEmail}/bookings`);
  }

  getMentorTrainings(email: string): Observable<any> {
    email = this.escapeEmailSpecialCharacter(email);
    return this.httpClient.get(`${MENTORS_API}/${email}/trainings`);
  }

  private escapeEmailSpecialCharacter(userEmail: string) {
    return userEmail.replace('@', '%40');
  }
}
