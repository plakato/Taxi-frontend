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
        MatPaginatorModule,
        MatSortModule
         } from '@angular/material';
import { CustomerService } from './shared/customer.service';
import { OrderService } from './shared/order.service';
import { LatLngLiteral } from '@agm/core';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ScheduledOrdersComponent } from './scheduled-orders/scheduled-orders.component';
import { OrdersPollingService } from './shared/data-source/orders-polling.service';
import { ListAllDriversComponent } from '../driver/list-all-drivers/list-all-drivers.component';
import { DriverModule, Driver } from '../driver/driver.module';
import { MyOrdersService } from './shared/my-orders.service';
import { Car } from '../car/car.module';
import { OngoingOrdersComponent } from './ongoing-orders/ongoing-orders.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';

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
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [NewOrderComponent, OrderHistoryComponent, ScheduledOrdersComponent, OngoingOrdersComponent, OrdersTableComponent],
  providers: [CustomerService, OrderService, OrdersPollingService, MyOrdersService],
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
  scheduled_pick_up_at: Date;
}

export interface Notification {
  subject: string;
  data: object;
}
