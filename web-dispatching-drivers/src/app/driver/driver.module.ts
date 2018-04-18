import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAllDriversComponent } from './list-all-drivers/list-all-drivers.component';

import { DriverService } from './shared/driver.service';
import { ShiftService } from './shared/shift.service';
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
  declarations: [ ListAllDriversComponent ],
  providers: [ DriverService, ShiftService ]
})
export class DriverModule { }

export interface Driver {
  id: number;
  name: string;
}
