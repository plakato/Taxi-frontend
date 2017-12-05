import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatGridListModule
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService]
})

export class UserModule { }
