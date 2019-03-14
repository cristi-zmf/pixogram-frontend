export class AuthentifiedUser {
  private _username: string;
  private _role: string;
  private _token: string;


  constructor(username: string, role: string, token: string) {
    this._username = username;
    this._role = role;
    this._token = token;
  }


  get username(): string {
    return this._username;
  }

  get role(): string {
    return this._role;
  }

  get token(): string {
    return this._token;
  }
}
