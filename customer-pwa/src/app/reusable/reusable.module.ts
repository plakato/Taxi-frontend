import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageAndButtonComponent } from './message-and-button/message-and-button.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { YesCancelDialogComponent } from './yes-cancel-dialog/yes-cancel-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [MessageAndButtonComponent, YesCancelDialogComponent],
  exports: [MessageAndButtonComponent, YesCancelDialogComponent]
})
export class ReusableModule { }
