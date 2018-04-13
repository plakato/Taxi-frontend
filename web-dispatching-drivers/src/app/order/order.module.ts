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
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule
         } from '@angular/material';
import { CustomerService } from './shared/customer.service';
import { OrderService } from './shared/order.service';
import { LatLngLiteral } from '@agm/core';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ScheduledOrdersComponent } from './scheduled-orders/scheduled-orders.component';
import { ScheduledOrdersService } from './scheduled-orders/data-source/scheduled-orders.service';
import { ListAllDriversComponent } from '../driver/list-all-drivers/list-all-drivers.component';
import { DriverModule, Driver } from '../driver/driver.module';
import { MyOrdersService } from './shared/my-orders.service';
import { Car } from '../car/car.module';

@NgModule({
  imports: [
    CommonModule,
    DriverModule,
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
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [NewOrderComponent, OrderHistoryComponent, ScheduledOrdersComponent],
  providers: [CustomerService, OrderService, ScheduledOrdersService, MyOrdersService],
  entryComponents: [ ListAllDriversComponent ]
})
export class OrderModule { }

export interface Customer {
  id: number;
  telephone: string;
  note: string;
  name: string;
}

export interface Order {
  id: number;
  status: string;
  driver_id: number;
  driver: Driver;
  vehicle_id: number;
  vehicle: Car;
  loc_start: LatLngLiteral;
  loc_finish: LatLngLiteral;

  passengers: number;
  note: string;
  VIP: boolean;
  contact_telephone: string;
  flightNumber: string;
  scheduled_pick_up_at: string;
}

export interface Notification {
  subject: string;
  data: object;
}
