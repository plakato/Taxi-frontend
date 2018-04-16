import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { DeleteCarDialogComponent } from './delete-car-dialog/delete-car-dialog.component';
import { DeleteEmployeeDialogComponent } from './delete-employee-dialog/delete-employee-dialog.component';
import { CancelOrderDialogComponent } from '../modals/cancel-order-dialog/cancel-order-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [DeleteCarDialogComponent, DeleteEmployeeDialogComponent, CancelOrderDialogComponent],
  exports: [DeleteCarDialogComponent, CancelOrderDialogComponent]
})
export class ModalsModule { }
