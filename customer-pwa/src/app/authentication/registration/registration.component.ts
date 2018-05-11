import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';
import { SmsCodeDialogComponent } from '../sms-code-dialog/sms-code-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackbar: MatSnackBar,
              private router: Router,
              private errorService: ErrorService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]]
    });
    this.registrationForm.setValidators([this.authService.areEqual]);
  }

  register() {
    if (this.registrationForm.valid) {
      let phone = this.registrationForm.get('phone').value;
      if (phone[0] !== '+') {
        phone = '+420' + phone;
      }
      const This = this;
      this.authService.register(phone, this.registrationForm.get('name').value, this.registrationForm.get('password').value)
        .subscribe(
          success => {
            This.openDialog(phone);
          },
          err => This.snackbar.open('Registrace se nezdařila.', '', {duration: 2000})
        );
    }
  }

  openDialog(phone: string) {
    // Open dialog for SMS code.
    const dialogRef = this.dialog.open(SmsCodeDialogComponent, {
      width: '250px',
      data: { phone: phone }
    });
    const This = this;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        This.snackbar.open('Registrace byla úspěšná! Pro pokračování se přihlašte.', '', {duration: 2000});
        This.router.navigate(['login']);
      }
    });
  }

}
