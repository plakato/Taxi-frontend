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
         MatExpansionModule,
         MatTableModule,
         MatIconModule,
         MatCheckboxModule } from '@angular/material';
import { ImageModule } from '../reusable/image/image.module';
import { PasswordConfirmationComponent } from './password-confirmation/password-confirmation.component';
import { ProfileDispatcherComponent } from './profile-dispatcher/profile-dispatcher.component';
import { SimpleFormContainerComponent } from './simple-form-container/simple-form-container.component';
import { NewPasswordInputComponent } from './new-password-input/new-password-input.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


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
     MatExpansionModule,
     MatTableModule,
     MatIconModule,
     MatCheckboxModule,
     ImageModule
  ],
  declarations: [LoginComponent,
    PasswordConfirmationComponent,
    ProfileDispatcherComponent,
    SimpleFormContainerComponent,
    NewPasswordInputComponent,
    EmployeesComponent,
    AddNewEmployeeComponent,
    EmployeeFormComponent],
  providers: [AuthenticationService, UserService]
})

export class UserModule { }

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  image: any;
  employee_roles: Array<any>;
}
