import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatSlideToggleModule,
         MatDatepickerModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FillInParamsComponent } from './fill-in-params/fill-in-params.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule
  ],
  declarations: [NewOrderComponent, FillInParamsComponent]
})
export class OrderModule { }
