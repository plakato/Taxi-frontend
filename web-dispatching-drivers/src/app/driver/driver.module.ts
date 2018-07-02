import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAllDriversComponent } from './list-all-drivers/list-all-drivers.component';

import { DriverService } from './shared/driver.service';
import { ShiftService } from './shared/shift.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MapModule } from '../map/map.module';
import { DriversArrivalsComponent } from './drivers-arrivals/drivers-arrivals.component';

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
  declarations: [ ListAllDriversComponent, DriversArrivalsComponent ],
  providers: [ DriverService, ShiftService ]
})
export class DriverModule { }

export interface Driver {
  id: number;
  name: string;
}
