export class UserConsult {

  constructor(
    public email: string, public firstName: string,
    public lastName: string, public role: string, public subscribed: boolean
  ) {}

  public static fromJson(json: any): UserConsult {
    return new UserConsult(json.email, json.firstName, json.lastName, json.role, false);
  }
}
