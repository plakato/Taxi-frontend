import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './dispatching/new-order/new-order.component';
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
        MatSortModule,
        MatTooltipModule,
        MatTableDataSource,
        MatCardModule
         } from '@angular/material';
import { CustomerService } from './shared/customer.service';
import { OrderService } from './shared/order.service';
import { CzechPaginatorIntl } from './shared/data-source/czech-paginator-intl.service';
import { LatLngLiteral } from '@agm/core';
import { OrderHistoryComponent, Status } from './dispatching/order-history/order-history.component';
import { ScheduledOrdersComponent } from './dispatching/scheduled-orders/scheduled-orders.component';
import { OrdersPollingService } from './shared/data-source/orders-polling.service';
import { ListAllDriversComponent } from '../driver/list-all-drivers/list-all-drivers.component';
import { DriverModule, Driver } from '../driver/driver.module';
import { MyOrdersService } from './shared/my-orders.service';
import { Car } from '../car/car.module';
import { OngoingOrdersComponent } from './dispatching/ongoing-orders/ongoing-orders.component';
import { OrdersTableComponent } from './dispatching/orders-table/orders-table.component';
import { CancelOrderDialogComponent } from '../reusable/modals/cancel-order-dialog/cancel-order-dialog.component';
import { NotificationService } from './shared/notification.service';
import { DriverNewOrderComponent } from './drivers/driver-new-order/driver-new-order.component';
import { TimeEditingComponent } from './drivers/time-editing/time-editing.component';
import { DriverArrivingComponent } from './drivers/driver-arriving/driver-arriving.component';
import { EnqueuedOrderComponent } from './drivers/enqueued-order/enqueued-order.component';


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
    MatSortModule,
    MatTooltipModule,
    MatCardModule
  ],
  declarations: [
    NewOrderComponent,
    OrderHistoryComponent,
    ScheduledOrdersComponent,
    OngoingOrdersComponent,
    OrdersTableComponent,
    DriverArrivingComponent,
    DriverNewOrderComponent,
    TimeEditingComponent,
    EnqueuedOrderComponent],
  providers: [CustomerService, OrderService, OrdersPollingService, MyOrdersService, CzechPaginatorIntl, NotificationService],
  exports: [DriverArrivingComponent, EnqueuedOrderComponent],
  entryComponents: [ ListAllDriversComponent, CancelOrderDialogComponent ]
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
  status: Status;
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


