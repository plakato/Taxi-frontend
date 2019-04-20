import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatSlideToggleModule,
         MatDatepickerModule, MatInputModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FillInParamsComponent } from './fill-in-params/fill-in-params.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order/create-order.component';
import { StaticMarkerMapComponent } from '../map/static-marker-map/static-marker-map.component';
import { MapModule } from '../map/map.module';
import { LatLngLiteral } from '@agm/core';
import { CreateAirportOrderComponent } from './create-airport-order/create-airport-order.component';
import { OrderCreatedComponent } from './ongoing-order/order-created/order-created.component';
import { ReusableModule } from '../reusable/reusable.module';
import { WaitForConfirmationComponent } from './ongoing-order/wait-for-confirmation/wait-for-confirmation.component';
import { CanceledOrderComponent } from './ongoing-order/canceled-order/canceled-order.component';
import { OrderFinishedComponent } from './ongoing-order/order-finished/order-finished.component';
import { WatchDriverArriveComponent } from './ongoing-order/watch-driver-arrive/watch-driver-arrive.component';
import { YesCancelDialogComponent } from '../reusable/yes-cancel-dialog/yes-cancel-dialog.component';
import { Status } from './order.service';
import { MarkedFraudComponent } from './ongoing-order/marked-fraud/marked-fraud.component';
import { OrderConfirmedByDriverComponent } from './ongoing-order/order-confirmed-by-driver/order-confirmed-by-driver.component';
import { ScheduledOrdersComponent } from './scheduled-orders/scheduled-orders.component';
import { ChangeDriverComponent } from './driver/change-driver/change-driver.component';
import { DriverSelectedComponent } from './driver/driver-selected/driver-selected.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MapModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    ReusableModule,
    MatToolbarModule,
    MatMenuModule
  ],
  declarations: [NewOrderComponent, FillInParamsComponent, CreateOrderComponent, CreateAirportOrderComponent, ChangeDriverComponent, 
                OrderCreatedComponent, WaitForConfirmationComponent, CanceledOrderComponent, OrderFinishedComponent, WatchDriverArriveComponent, 
                MarkedFraudComponent, OrderConfirmedByDriverComponent, ScheduledOrdersComponent, DriverSelectedComponent],
  entryComponents: [YesCancelDialogComponent]
})
export class OrderModule { }

export interface NewOrder {
  phone: string;
  driverID: number;
  dispatcherID: number;
  loc_start: LatLngLiteral;
  loc_finish: LatLngLiteral;
  startAddress: string;
  finishAddress: string;
  passenger_count: number;
  note: string;
  contact_phone: string;
  VIP: boolean;
  flight_number: string;
  scheduled_pick_up_at: Date;
}

export interface Order extends NewOrder {
  id: number;
  status: Status;
  created_at: Date;
  updated_at: Date;

  driver_id: number;
  vehicle_id: number;
  dispatcher_id: number;

  driver: Driver;
  vehicle: Car;

  address_start: string;
  address_finish: string;
  loc_start: LatLngLiteral;
  loc_finish: LatLngLiteral;
  passenger_count: number;
  note: string;
  contact_telephone: string;
  estimated_price: number;
  explicitly_chosen_driver: boolean;
  VIP: boolean;
  scheduled_pick_up_at: Date;
  flight_number: string;
  source: string;

  start_est: Date;
  start: Date;
  arrived_time: Date;
  arrived_time_est: Date;  
  arrived_time_orig_est: Date;
  finish_time: Date;
  finish_time_est: Date;  
  finish_time_orig_est: Date;
  picked_up_time: Date;
  picked_up_time_est: Date;
  picked_up_time_orig_est: Date;
}

export interface DriversArrival {
  // driverID: number;
  driver: Driver;
 // carID: number;
  car: Car;
  arrivalTime: Date
}

export interface Driver {
  id: number;
 // image: string;
  name: string;
}

export interface Car extends Driver { 
  plate: string; 
}

