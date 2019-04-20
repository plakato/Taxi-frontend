import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order.module';

@Injectable({
  providedIn: 'root'
})
export class DriversArrivalsService {
  arrivals: DriverArrival[] = [];

  constructor(private http: HttpClient) {
    const orderJSON = localStorage.getItem('newOrder');
    if (orderJSON !== 'undefined' && orderJSON !== 'null') {
      const order = JSON.parse(orderJSON);
      this.getArrivals(order).subscribe();
    }
   }

  getArrivals(order: Order) {
    if (order == null || order.loc_start == null) {
      return from([]);
    }
    const This = this;
    return this.http.post<DriverArrival[]>('orders/drivers_arrivals', JSON.stringify({
      order: {
        customer_telephone: order.phone,
        dispatcher_id: '',
        driver_id: '',
        loc_start: {
          lat: order.loc_start.lat,
          lng: order.loc_start.lng
        },
        loc_finish: {
          lat: order.loc_finish.lat,
          lng: order.loc_finish.lng
        },
        address_start: order.address_start,
        address_finish: order.address_finish,
        passenger_count: order.passenger_count,
        note: order.note == null ? '' : order.note,
        contact_telephone: order.contact_phone == null ? '' : order.contact_phone,
        VIP: order.VIP == null ? false : order.VIP,
        flight_number: order.flight_number == null ? '' : order.flight_number,
        scheduled_pick_up_at: order.scheduled_pick_up_at == null ? '' : order.scheduled_pick_up_at.toISOString()
        }
    })).pipe(map(arrivals => This.arrivals = arrivals));
  }

  getDriver(driverID: number) {
    return this.arrivals.find( arrival => arrival.driver.id === driverID);
  }

  getMinutes(id: number): number {
    const arrival = this.arrivals.find(arrival => arrival.driver.id === id);
    if (arrival == null) {
      return null;
    } else {
      const arrivalDate = new Date(arrival.arrived_time_est);
      return Math.trunc((arrivalDate.valueOf() - Date.now()) / 1000);
    }
  }
}

export interface DriverArrival {
    driver: {
      id: number;
      name: string;
      image: string;
    },
    arrived_time_est: Date;
}




