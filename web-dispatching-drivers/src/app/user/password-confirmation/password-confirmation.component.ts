import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

/** This avoids showing errors before the form was edited (keeping it invalid). **/
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.scss']
})

export class PasswordConfirmationComponent implements OnInit {

  loading = false;
  passwordForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: [''],
      passwordConfirm: ['']
    });
  }

/** Function sending confirmation token with new password to the server and repsonding to result. */
  confirm() {
    if (!this.passwordForm.valid) {
      this.snackBar.open('Vyplňte správně všechny údaje!', 'OK', {duration: 2000});
      return;
    }
    this.loading = true;
    const confirmation_token = this.route.snapshot.paramMap.get('confirmation_token');
    this.authenticationService.confirm(this.passwordForm.get('password').value, confirmation_token)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/login']);
            // TODO: inform about successful confirmation
          },
          err => {
            this.loading = false;
            err.error.errors.forEach(pair => {
              this.snackBar.open(Object.values(pair)[0].toString(), 'OK');
            });
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was:`, err.error);
            }
          });
  }
}
