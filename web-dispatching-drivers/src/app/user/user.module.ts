import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatGridListModule
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
