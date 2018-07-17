import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { DirtyErrorStateMatcher } from '../../reusable/error-state-matcher/error-state-matcher.module';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.scss']
})


export class PasswordConfirmationComponent implements OnInit {

  loading = false;
  passwordForm: FormGroup;
  matcher = new DirtyErrorStateMatcher();

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private errorService: ErrorService) {
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
    const This = this;
    this.loading = true;
    const confirmation_token = this.route.snapshot.paramMap.get('confirmation_token');
    this.authenticationService.confirm(this.passwordForm.get('password').value, confirmation_token)
        .subscribe(
          data => {
            console.log(data);
            This.router.navigate(['/login']);
            This.errorService.showMessageToUser('Vaše heslo bylo potvrzeno.');
          },
          err => {
            This.loading = false;
            err.error.errors.forEach(pair => {
              This.snackBar.open(Object.values(pair)[0].toString(), 'OK');
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
