import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';

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
              private errorService: ErrorService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      password: ['', [Validators.required]], // TODO add checking.
      passwordCofirmation: ['', [Validators.required]]
    });
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
            This.snackbar.open('Registrace byla úspěšná! Pro pokračování se přihlašte.', '', {duration: 2000});
            This.router.navigate(['login']);
          },
          err => This.snackbar.open('Registrace se nezdařila.', '', {duration: 2000})
        );
    }
  }

}
