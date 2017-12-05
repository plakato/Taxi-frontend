import { Component, OnInit } from '@angular/core';
import { debug } from 'util';
import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loading = false;
  failedToLogIn = false;
  model: any = {};

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
          data => {
          },
          error => {
            this.loading = false;
            this.failedToLogIn = true;
          });
    }
}
