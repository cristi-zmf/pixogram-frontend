export class TrainingSearchResult {

  constructor(
    public firstName: string, public lastName: string, public skillName: string, public yearsOfExperience: number,
    public noOfOverallTrainingsDone: number, noOfTrainingsForTechnologyDone: number, trainingId: string
  ) {}
}
