import { Component, OnInit, Input } from '@angular/core';
import { debug } from 'util';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loading = false;
  model: any = { email: null, password: null};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
          data => {
            // TODO: add check for admin
            localStorage.setItem('currentUser', JSON.stringify({
              token: data.token,
              id: data.id,
              roles: data.employee_roles }));

            this.router.navigate(['dispatching/new-order']);
          },
          err => {
            this.loading = false;
          /*  err.error.errors.forEach(pair => {
              this.snackbar.open(Object.values(pair)[0].toString(), 'OK', {duration: 2000});
            });
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
          */});
    }
}
