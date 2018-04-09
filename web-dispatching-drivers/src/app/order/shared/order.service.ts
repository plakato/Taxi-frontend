import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.module';

@Injectable()
export class OrderService {

  constructor( private http: HttpClient ) { }

  createOrder(order: Order) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('orders', JSON.stringify(
      {
        order: {
          customer_telephone: order.contact_telephone,
          driver_id: order.driver_id,
          dispatcher_id: user.id,
          loc_start: {
            lat: order.loc_start.lat,
            lng: order.loc_start.lng
          },
          loc_finish: (order.loc_finish == null) ? null : {
            lat: order.loc_finish.lat,
            lng: order.loc_finish.lng
          },
          passenger_count: order.passengers,
          note: order.note,
          VIP: order.VIP,
          flight_number: order.flightNumber,
          pick_up_at: order.pick_up_at
        }
      }
    ));
  }
}

