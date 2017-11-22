import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
     MatButtonModule
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
