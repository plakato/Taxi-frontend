import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAllDriversComponent } from './list-all-drivers/list-all-drivers.component';

import { DriverService } from './shared/driver.service';
import { ShiftService } from './shared/shift.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatIconModule, MatButtonModule, MatCardModule } from '@angular/material';
import { MapModule } from '../map/map.module';
import { DriversArrivalsComponent } from './drivers-arrivals/drivers-arrivals.component';
import { DriversArrivalsService } from './shared/drivers-arrivals.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MapModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [ ListAllDriversComponent, DriversArrivalsComponent ],
  declarations: [ ListAllDriversComponent, DriversArrivalsComponent ],
  providers: [ DriverService, ShiftService, DriversArrivalsService ]
})
export class DriverModule { }

export interface Driver {
  id: number;
  name: string;
}
