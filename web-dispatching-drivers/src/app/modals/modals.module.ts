import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { DeleteCarDialogComponent } from './delete-car-dialog/delete-car-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [DeleteCarDialogComponent],
  exports: [DeleteCarDialogComponent]
})
export class ModalsModule { }
