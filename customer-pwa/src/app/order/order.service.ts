import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewOrder } from './order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: NewOrder) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('orders', JSON.stringify(
      {
        order: {
          customer_telephone: order.phone,
          driver_id: order.driverID,
          dispatcher_id: user.id,
          loc_start: {
            lat: order.loc_start.lat,
            lng: order.loc_start.lng
          },
          loc_finish: (order.loc_finish == null) ? null : {
            lat: order.loc_finish.lat,
            lng: order.loc_finish.lng
          },
          passenger_count: order.passenger_count,
          note: order.note,
          contact_telephone: order.contact_phone,
          VIP: order.VIP,
          flight_number: order.flight_number,
          scheduled_pick_up_at: order.scheduled_pick_up_at.toISOString()
        }
      }
    ));
  }
}
