import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.module';
import { Observable } from 'rxjs/Observable';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { DriverService } from '../../driver/shared/driver.service';
import { CarService } from '../../car/shared/car.service';
import { CarRetrievalService } from '../../car/shared/car-retrieval.service';
import { OrderExtended } from '../dispatching/order-history/order-history.component';
import { CustomerService } from './customer.service';
import { LatLngLiteral } from '@agm/core';
import { MyOrdersService } from './my-orders.service';

@Injectable()
export class OrderService {

  constructor( private http: HttpClient,
              private driverService: DriverService,
              private carService: CarRetrievalService,
              private customerService: CustomerService) { }

  private fillOrderDriver(order: OrderExtended): Observable<OrderExtended> {
    if (order.driver_id == null) {
      return of(order);
    } else {
      return this.driverService.getDriver(order.driver_id).map(driver => {
        const o = order;
        o.driver = driver;
        return o;
      });
    }
  }

  private fillOrderVehicle(order: OrderExtended): Observable<OrderExtended>  {
    if (order.vehicle_id == null) {
      return of(order);
    } else {
      return this.carService.show(order.vehicle_id)
      .map(car => {
        const o = order;
        o.vehicle = car;
        return o;
      });
    }
  }

  private fillOrderCustomer(order: OrderExtended): Observable<OrderExtended>  {
    if (order.customer_id == null) {
      return of(order);
    } else {
      return this.customerService.getCustomer(order.customer_id.toString()).map(cust => {
        const o = order;
        o.customer = cust;
        return o;
      });
    }
  }

  fillInInfo(orders: OrderExtended[]): Observable<OrderExtended> {
    const This = this;
    return from(orders).pipe(
      mergeMap( order => This.fillOrderDriver(order)),
      mergeMap( order => This.fillOrderVehicle(order)),
      mergeMap( order => This.fillOrderCustomer(order))
    );
  }

  createOrder(order: Order) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post('orders', JSON.stringify(
      {
        order: {
          address_start: order.address_start,
          address_finish: order.address_finish,
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
          scheduled_pick_up_at: order.scheduled_pick_up_at == null ? '' : order.scheduled_pick_up_at.toISOString()
        }
      }
    ));
  }

  arriving(id: number) {
    return this.http.patch<OrderExtended>('orders/' + id + '/arriving', '');
  }

  cancel(id: number) {
    return this.http.patch('orders/' + id + '/cancel', '');
  }

  updateDriver(orderID: number, driverID: number) {
    return this.http.patch('orders/' + orderID, JSON.stringify({
      driver: {id: driverID}
    }));
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
    const This = this;
    return this.http.patch<OrderExtended>('orders/' + orderID + '/arrived', '').map(
      o => This.fillInInfo([o])
    );
  }

  pickedUpCustomer(orderID: number) {
    const This = this;
    return this.http.patch<OrderExtended>('orders/' + orderID + '/picked_up', '').map(
      o => This.fillInInfo([o])
    );
  }

  customerNotHere(orderID: number) {
    return this.http.patch('orders/' + orderID + '/customer_not_on_its_place', '');
  }

  changeDropOffTime(orderID: number, newTime: Date) {
    const This = this;
    return this.http.patch<OrderExtended>('orders/' + orderID + '/change_drop_off_time', JSON.stringify({
      order: {
        drop_off_time: newTime.toISOString()
      }
    })).map(
      o => This.fillInInfo([o])
    );
  }

  changeDropOffLocation(orderID: number, newLoc: LatLngLiteral) {
    const This = this;
    return this.http.patch<OrderExtended>('orders/' + orderID + '/change_drop_off_location', JSON.stringify({
      order: {
        location: {
          lat: newLoc.lat,
          lng: newLoc.lng
        }
      }
    })).map(
      o => This.fillInInfo([o])
    );
  }

  finish(orderID: number) {
    return this.http.patch<OrderExtended>('orders/' + orderID + '/finished', '');
  }

  fraud(orderID: number) {
    return this.http.patch<OrderExtended>('orders/' + orderID + '/fraud', '');
  }
}
