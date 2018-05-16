import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatSlideToggleModule,
         MatDatepickerModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FillInParamsComponent } from './fill-in-params/fill-in-params.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateOrderComponent } from './create-order/create-order.component';
import { StaticMarkerMapComponent } from '../map/static-marker-map/static-marker-map.component';
import { MapModule } from '../map/map.module';
import { LatLngLiteral } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MapModule
  ],
  declarations: [NewOrderComponent, FillInParamsComponent, CreateOrderComponent],
})
export class OrderModule { }

export interface NewOrder {
  phone: string;
  driverID: number;
  dispatcherID: number;
  loc_start: LatLngLiteral;
  loc_finish: LatLngLiteral;
  passenger_count: number;
  note: string;
  contact_phone: string;
  VIP: boolean;
  flight_number: string;
  scheduled_pick_up_at: Date;
}