import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../order/order.module';
import { OrderExtended } from '../../order/dispatching/order-history/order-history.component';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriversArrivalsService {
  arrivals = [];
  order: Order;

  constructor(private http: HttpClient) { }
  

  getArrivals(order: OrderExtended) {
    this.order = order;
    if (order == null) {
      this.arrivals = [];
      return;
    }
    const This = this;
    return this.http.post<DriverArrival[]>('orders/drivers_arrivals', JSON.stringify({
      order: {
        customer_telephone: order.contact_telephone,  
        driver_id: '',
        dispatcher_id: order.dispatcher_id,
        loc_start: {
          lat: order.loc_start.lat,
          lng: order.loc_start.lng
        },
        loc_finish: {
          lat: order.loc_finish.lat,
          lng: order.loc_finish.lng 
        },
        passenger_count: order.passenger_count,
        note: order.note,
        contact_telephone: order.contact_telephone,
        VIP: order.VIP,
        flight_number: order.flight_number == null ? '' : order.flight_number,
        scheduled_pick_up_at: order.scheduled_pick_up_at == null ? '' : order.scheduled_pick_up_at.toISOString()
        }
    })).pipe(map(arrivals => {
      This.arrivals = arrivals;
      return arrivals;
    }));
  }
}

export interface DriverArrival {
    driver: {
      id: number;
      name: string;
      image: string;
    };
    vehicle: {
      id: number;
      name: string;
      image: string;
    };
    arrived_time_est: Date;
}
