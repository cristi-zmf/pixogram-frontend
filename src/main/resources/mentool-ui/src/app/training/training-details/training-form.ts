import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Skill} from "../../skill/skill";

export class TrainingForm extends FormGroup{
  constructor() {
    super({
      trainingId: new FormControl(''),
      skillName: new FormControl('', [Validators.required]),
      skillId: new FormControl('', ),
      facilitiesDesc: new FormControl('', [Validators.required]),
      prerequisitesDesc: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      noOfTrainingsDone: new FormControl(0, [Validators.required, Validators.pattern("[0-9]")]),
      mentorName: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      fee: new FormControl(0, [Validators.required]),
      traineesBooked: new FormControl([])

    });
  }

  setFormFromDto(trainingData: any) {
    this.patchValue({
      trainingId: trainingData.trainingId,
      skillName: trainingData.skillName,
      facilitiesDesc: trainingData.facilitiesDesc,
      prerequisitesDesc: trainingData.prerequisitesDesc,
      emailAddress: trainingData.emailAddress,
      noOfTrainingsDone: trainingData.noOfTrainingsDone,
      mentorName: trainingData.mentorName,
      startDate: trainingData.startDate,
      endDate: trainingData.endDate,
      fee: trainingData.fee,
      traineesBooked: trainingData.traineesBooked
    })
  }

  toCreationDto(): any{
    return {
      skillId: this.get('skillId').value,
      facilitiesDesc: this.get('facilitiesDesc').value,
      emailAddress: this.get('emailAddress'),
      prerequisitesDesc: this.get('prerequisitesDesc').value,
      noOfTrainingsDone: this.get('noOfTrainingsDone').value,
      startDate: this.get('startDate').value,
      endDate: this.get('endDate').value,
      fee: this.get('fee').value
    };
  }

  public getTrainingId(): string {
    return this.get('trainingId').value;
  }

  public getTraineesBooked(): Array<string> {
    return this.get('traineesBooked').value;
  }

  public updateSkillField(skill: Skill) {
    this.patchValue({
      skillName: skill.skillName
    });
  }

  updateStartDate(date: any) {
    this.patchValue({
      startDate: date
    });
  }

  updateEndDate(date: any) {
    this.patchValue({
      endDate: date
    });
  }
}
