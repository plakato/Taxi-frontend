import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SmsCodeDialogComponent } from './sms-code-dialog/sms-code-dialog.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [LoginComponent, RegistrationComponent, PasswordRecoveryComponent, SmsCodeDialogComponent, NewPasswordComponent],
  providers: [AuthService],
  entryComponents: [SmsCodeDialogComponent]
})
export class AuthenticationModule { }

export interface Customer {

  id: number;
  name: string;
  telephone: string;
  token: string;
}
