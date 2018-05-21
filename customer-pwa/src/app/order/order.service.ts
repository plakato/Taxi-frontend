import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.module';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {
  public order: Order;

  constructor(private http: HttpClient) {
    this.newOrder();    
   }

  ngOnInit() {
  }

  newOrder() {
    this.order = {} as any;
  }

  sendNewOrder() {
    const This = this;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('orders', JSON.stringify(
      {
        order: {
          customer_telephone: this.order.phone,
          driver_id: this.order.driverID,
          loc_start: {
            lat: this.order.loc_start.lat,
            lng: this.order.loc_start.lng
          },
          loc_finish: (this.order.loc_finish == null) ? null : {
            lat: this.order.loc_finish.lat,
            lng: this.order.loc_finish.lng
          },
          passenger_count: this.order.passenger_count,
          note: this.order.note,
          contact_telephone: this.order.contact_phone,
          VIP: this.order.VIP,
          flight_number: this.order.flight_number,
          scheduled_pick_up_at: this.order.scheduled_pick_up_at == null? null: this.order.scheduled_pick_up_at.toISOString()
        }
      }
    )).pipe(tap(order => {
      This.newOrder();
      return order;
    }));
  }

  cancelCurrentOrder() {
    return this.http.patch('orders/' + this.order.id + '/cancel', '');
  }
}
