import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor( private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      password: ['', [Validators.required]]
    });
  }

  logIn() {
    if (this.loginForm.valid) {
      let phone = this.loginForm.get('phoneNumber').value;
      if (phone[0] !== '+') {
        phone = '+420' + phone;
      }
      this.authService.login(phone, this.loginForm.get('password').value).subscribe(
        success => this.router.navigate(['new-order']),
        fail => this.errorService.showMessageToUser('Přihlášení se nezdařilo.')
      );
    }

  }

  register() {
    this.router.navigate(['registration']);
  }

  forgotPassword() {
    this.router.navigate(['password-recovery']);
  }

  continueWithoutLogin() {
    this.router.navigate(['new-order']);
  }

}
