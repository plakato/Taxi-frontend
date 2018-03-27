import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { MapModule } from '../map/map.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule
         } from '@angular/material';
import { CustomerService } from './shared/customer.service';
import { DriverService } from './shared/driver.service';
import { OrderService } from './shared/order.service';
import { ListAllDriversComponent } from './list-all-drivers/list-all-drivers.component';
import { LatLngLiteral } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    MapModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule
  ],
  declarations: [NewOrderComponent, ListAllDriversComponent],
  providers: [CustomerService, DriverService, OrderService]
})
export class OrderModule { }

export interface Customer {
  id: number;
  telephone: string;
  note: string;
  name: string;
}

export interface Driver {
  id: number;
  name: string;
}

export interface Order {
  phoneNumber: string;
  driver_id: number;
  loc_start: LatLngLiteral;
  loc_finish: LatLngLiteral;
  passengers: number;
  note: string;
  VIP: boolean;
  flightNumber: string;
  pick_up_at: string;
}
