import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { Order } from '../../order.module';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DriverService } from '../../../driver/shared/driver.service';
import { CarService } from '../../../car/shared/car.service';
import { OrderService } from '../../shared/order.service';

@Injectable()
export class OrdersPollingService {

  constructor( private http: HttpClient,
              private orderService: OrderService) {
   }

  loadPage(params: OrderRequestParams): Observable<{item: Observable<Order>, totalCount: number}> {
    const thisService = this;
    return this.http.get<OrderResponse>('orders/' + params.toString())
              .map(
                res => {
                  return {item: thisService.orderService.fillInDriverAndVehicle(res.items),
                          totalCount: res.total_count };
                });
  }
}

interface OrderResponse {
  items: Order[];
  total_count: number;
}

// Class describing order request http params.
export class OrderRequestParams {
  numbers: Map<string, number> = new Map<string, number>();
  booleans: Map<string, boolean> = new Map<string, boolean>();
  dates: Map<string, Date> = new Map<string, Date>();
  status: Set<string> = new Set<string>();

  constructor(page: number, per_page: number) {
    // Server pages are numbered starting from 1 (not 0!).
    this.numbers.set('page', ++page);
    this.numbers.set('per_page', per_page);
  }

  set page(number) { this.numbers.set('page', ++number); }
  get page(): number { return this.numbers.get('page'); }
  set per_page(number) { this.numbers.set('per_page', number); }
  get per_page(): number { return this.numbers.get('per_page'); }
  set scheduled(bool: boolean) { this.booleans.set('scheduled', bool); }
  set since(when: Date) { this.dates.set('since', when); }
  set until(when: Date) { this.dates.set('until', when); }

  set waiting(bool: boolean) {
    if (bool) {
      this.status.add('created');
      this.status.add('driver_confirmed');

    } else {
      this.status.delete('created');
      this.status.delete('driver_confirmed');
    }
  }
  set ongoing(bool: boolean) {
    if (bool) {
      this.status.add('customer_picked_up');
      this.status.add('driver_arriving');
      this.status.add('driver_arrived');

    } else {
      this.status.delete('customer_picked_up');
      this.status.delete('driver_arriving');
      this.status.delete('driver_arrived');
    }
  }
  set finished(bool: boolean) {
    if (bool) {
      this.status.add('finished');
      this.status.add('fraud');
      this.status.add('canceled');

    } else {
      this.status.delete('finished');
      this.status.delete('fraud');
      this.status.delete('canceled');
    }
  }


  toString(): string {
    const values: Map<string, string> = new Map<string, string>();
    this.numbers.forEach((value, key) => { values.set(key, String(value)); });
    this.booleans.forEach((value, key) => { values.set(key, String(value)); });
    this.dates.forEach((value, key) => { values.set(key, value.toISOString()); });
    const result = Array.from(values.keys()).map(key => key + '=' + values.get(key));
    this.status.forEach(status => result.push('status[]=' + status));
    return '?' + result.join('&');
  }
}
