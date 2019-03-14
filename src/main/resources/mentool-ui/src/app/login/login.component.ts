import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.username, this.password);
  }
}
