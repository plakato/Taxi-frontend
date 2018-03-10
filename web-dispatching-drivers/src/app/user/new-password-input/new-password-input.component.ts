import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-new-password-input',
  templateUrl: './new-password-input.component.html',
  styleUrls: ['./new-password-input.component.scss']
})
export class NewPasswordInputComponent implements AfterViewChecked {
  @Input() passwordForm: FormGroup;
  @Input() matcher: ErrorStateMatcher;

  constructor() { }

    // Needs to be initialized after ngInit().
 ngAfterViewChecked() {
    this.passwordForm.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
    this.passwordForm.controls['passwordConfirm'].setValidators([Validators.required]);
    this.passwordForm.setValidators([this.areEqual]);
  /*  // Creates a group of the two passwords + adds validation to each and to the group
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)] ],
      passwordConfirm: ['', [Validators.required]]
    }, { validator: this.areEqual });*/
  }

  /** Custom validation function to determine that password and password confirmation are identical */
  areEqual(group: AbstractControl)  {
    if (group.get('password').value !== group.get('passwordConfirm').value) {
      return  { 'passwordMismatch': {value: true}} ;
    }
    return null;
  }

}
