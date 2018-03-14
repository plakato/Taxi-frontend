import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { MapModule } from '../map/map.module';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MapModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [NewOrderComponent]
})
export class OrderModule { }
