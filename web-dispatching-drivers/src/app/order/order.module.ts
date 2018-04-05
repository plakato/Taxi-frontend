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
import { ShiftService } from './shared/shift.service';
import { ListAllDriversComponent } from '../driver/list-all-drivers/list-all-drivers.component';
import { DriverModule } from '../driver/driver.module';

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
  providers: [CustomerService, OrderService, ScheduledOrdersService, ShiftService],
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
