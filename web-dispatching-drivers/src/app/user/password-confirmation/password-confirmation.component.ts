import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

export interface User {
  token: string;
}

/** Error when form was edited into invalid state. **/
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
    private fb: FormBuilder,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    // Creates a group of the two passwords + adds validation to each and to the group
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)] ],
      passwordConfirm: ['', [Validators.required]]
    }, { validator: this.areEqual });
  }


  /** Custom validation function to determine that password and password confirmation are identical */
  areEqual(group: AbstractControl)  {
    if (group.get('password').value !== group.get('passwordConfirm').value) {
      return  { 'passwordMismatch': {value: true}} ;
    }
    return null;
  }



  confirm() {
    this.loading = true;
    const confirmation_token = this.route.snapshot.paramMap.get('confirmation_token');
    this.authenticationService.confirm(this.passwordForm.get('password').value, confirmation_token)
        .subscribe(
          data => {
            console.log(data);
            //localStorage.setItem('currentUser', JSON.stringify(data.token));
          },
          err => {
            this.loading = false;
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
