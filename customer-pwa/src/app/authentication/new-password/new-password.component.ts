import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService,
              private snackbar: MatSnackBar,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordCofirmation: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
    this.form.setValidators([this.authService.areEqual]);
  }

  setNewPassword() {
    if (this.form.invalid) { return; }
    const This = this;
    this.route.params.subscribe(params => {
      const phone = params['phone'];
      This.authService.setNewPasswordFromRecovery(phone, This.form.get('password').value, This.form.get('code').value)
        .subscribe(
          success => { This.snackbar.open('Vaše heslo bylo úspěšně změneno. Pro pokračování se přihlašte.', '', {duration: 2000});
                       This.router.navigate(['login']); }
        );
      });
  }

  resendCode() {
    const This = this;
    this.route.params.subscribe(params => {
      const phone = params['phone'];
      This.authService.forgotPassword(phone).subscribe();
    });
  }

}
