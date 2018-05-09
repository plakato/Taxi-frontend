import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      password: ['', [Validators.required]]
    });
  }

  logIn() {

  }

  register() {

  }

  forgotPassword() {

  }

  continueWithoutLogin() {

  }

}
