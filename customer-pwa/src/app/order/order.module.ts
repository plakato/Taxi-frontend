import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatSlideToggleModule,
         MatDatepickerModule, MatInputModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FillInParamsComponent } from './fill-in-params/fill-in-params.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order/create-order.component';
import { StaticMarkerMapComponent } from '../map/static-marker-map/static-marker-map.component';
import { MapModule } from '../map/map.module';
import { LatLngLiteral } from '@agm/core';
import { CreateAirportOrderComponent } from './create-airport-order/create-airport-order.component';
import { ChangeDriverComponent } from './change-driver/change-driver.component';
import { OrderCreatedComponent } from './ongoing-order/order-created/order-created.component';
import { ReusableModule } from '../reusable/reusable.module';
import { WaitForConfirmationComponent } from './ongoing-order/wait-for-confirmation/wait-for-confirmation.component';
import { CanceledOrderComponent } from './ongoing-order/canceled-order/canceled-order.component';
import { OrderFinishedComponent } from './ongoing-order/order-finished/order-finished.component';

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
    ReusableModule
  ],
  declarations: [NewOrderComponent, FillInParamsComponent, CreateOrderComponent, CreateAirportOrderComponent, ChangeDriverComponent, OrderCreatedComponent, WaitForConfirmationComponent, CanceledOrderComponent, OrderFinishedComponent],
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
}