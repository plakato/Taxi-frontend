import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageAndButtonComponent } from './message-and-button/message-and-button.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [MessageAndButtonComponent],
  exports: [MessageAndButtonComponent]
})
export class ReusableModule { }
