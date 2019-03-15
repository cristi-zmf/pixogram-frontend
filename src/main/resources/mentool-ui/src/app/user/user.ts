import {Role} from "../authorities/role.enum";

export class User {
  private role: Role = Role.USER;
  constructor(
    public username: string, public password: string, public firstName: string, public lastName: string
  ) {}
}
