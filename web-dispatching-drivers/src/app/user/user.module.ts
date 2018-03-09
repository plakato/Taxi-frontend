import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { UserService } from './shared/user.service';
import { MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatGridListModule,
         MatProgressSpinnerModule,
         MatSnackBarModule,
         MatExpansionModule } from '@angular/material';
import { PasswordConfirmationComponent } from './password-confirmation/password-confirmation.component';
import { ProfileDispatcherComponent } from './profile-dispatcher/profile-dispatcher.component';
import { SimpleFormContainerComponent } from './simple-form-container/simple-form-container.component';
import { NewPasswordInputComponent } from './new-password-input/new-password-input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatGridListModule,
     MatProgressSpinnerModule,
     MatSnackBarModule,
     MatExpansionModule
  ],
  declarations: [LoginComponent,
    PasswordConfirmationComponent,
    ProfileDispatcherComponent,
    SimpleFormContainerComponent,
    NewPasswordInputComponent],
  providers: [AuthenticationService, UserService]
})

export class UserModule { }

export interface User {
  id: string;
  name: string;
  token: string;
  image: any;
  employee_roles: Array<any>;
}
