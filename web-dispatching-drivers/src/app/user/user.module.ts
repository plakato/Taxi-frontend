import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatGridListModule,
     MatProgressSpinnerModule
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService]
})

export class UserModule { }
