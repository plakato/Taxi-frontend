import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.module';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { DriverService } from '../../driver/shared/driver.service';
import { CarService } from '../../car/shared/car.service';
import { CarRetrievalService } from '../../car/shared/car-retrieval.service';
import { OrderExtended } from '../dispatching/order-history/order-history.component';
import { CustomerService } from './customer.service';

@Injectable()
export class OrderService {

  constructor( private http: HttpClient,
              private driverService: DriverService,
              private carService: CarRetrievalService,
              private customerService: CustomerService ) { }

  private fillOrderDriver(order: OrderExtended): Observable<OrderExtended> {
    return this.driverService.getDriver(order.driver_id).map(driver => {
      const o = order;
      o.driver = driver;
      return o;
    });
  }

  private fillOrderVehicle(order: OrderExtended): Observable<OrderExtended>  {
    return this.carService.show(order.vehicle_id).map(car => {
      const o = order;
      o.vehicle = car;
      return o;
    });
  }

  private fillOrderCustomer(order: OrderExtended): Observable<OrderExtended>  {
    return this.customerService.getCustomer(order.customer_id.toString()).map(cust => {
      const o = order;
      o.customer = cust;
      return o;
    });
  }

  fillInInfo(orders: OrderExtended[]): Observable<OrderExtended> {
    return from(orders).pipe(
      mergeMap( order => this.fillOrderDriver(order)),
      mergeMap( order => this.fillOrderVehicle(order)),
      mergeMap( order => this.fillOrderCustomer(order))
    );
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
          scheduled_pick_up_at: order.scheduled_pick_up_at.toISOString()
        }
      }
    ));
  }

  cancel(id: number) {
    return this.http.patch('orders/' + id + '/cancel', '');
  }

  updateDriver(orderID: number, driverID: number) {

  }

  get(orderID: number) {
    return this.http.get<OrderExtended>('orders/' + orderID);
  }

  changeArrivalTime(orderID: number, newTime: Date) {
    return this.http.patch<OrderExtended>('orders/' + orderID + '/change_arrive_time', JSON.stringify(
      {
        order: {
          arrive_time: newTime.toISOString()
        }
      }
    ));
  }

  arrived(orderID: number) {
    return this.http.patch<OrderExtended>('orders/' + orderID + 'arrived', '');
  }
}

