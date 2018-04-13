import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.module';
import { Observable } from 'rxjs/Observable';
import { DriverService } from '../../driver/shared/driver.service';
import { CarService } from '../../car/shared/car.service';
import { CarRetrievalService } from '../../car/shared/car-retrieval.service';

@Injectable()
export class OrderService {

  constructor( private http: HttpClient,
              private driverService: DriverService,
              private carService: CarRetrievalService ) { }

  fillOrderDriver(order: Order): Observable<Order> {
    return this.driverService.getDriver(order.driver_id).map(driver => {
      const o = order;
      o.driver = driver;
      return o;
    });
  }

  fillOrderVehicle(order: Order): Observable<Order>  {
    return this.carService.show(order.vehicle_id).map(car => {
      const o = order;
      o.vehicle = car;
      return o;
    });
  }

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
          pick_up_at: order.scheduled_pick_up_at
        }
      }
    ));
  }

}

