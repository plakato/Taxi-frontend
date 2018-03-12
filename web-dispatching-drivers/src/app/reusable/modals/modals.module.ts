import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { DeleteCarDialogComponent } from './delete-car-dialog/delete-car-dialog.component';
import { DeleteEmployeeDialogComponent } from './delete-employee-dialog/delete-employee-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [DeleteCarDialogComponent, DeleteEmployeeDialogComponent],
  exports: [DeleteCarDialogComponent]
})
export class ModalsModule { }
