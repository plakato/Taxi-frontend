import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAllDriversComponent } from './list-all-drivers/list-all-drivers.component';

import { DriverService } from './shared/driver.service';
import { ShiftService } from './shared/shift.service';
import { DriverNewOrderComponent } from './driver-new-order/driver-new-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MapModule } from '../map/map.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MapModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ ListAllDriversComponent ],
  declarations: [ ListAllDriversComponent, DriverNewOrderComponent ],
  providers: [ DriverService, ShiftService ]
})
export class DriverModule { }

export interface Driver {
  id: number;
  name: string;
}
