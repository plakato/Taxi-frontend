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
  public totalCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  private readonly orders: Observable<Array<Order>> = this.ordersEventSource.asObservable();
  private orderData: Order[] = new Array();

  constructor( private http: HttpClient,
              private orderService: OrderService) {
   }

  loadPage(params: OrderRequestParams) {
    const thisService = this;
    let iterator = 0;
    const orders$ = this.http.get<OrderRequest>('orders/' + params.toString())
                    .map(
                      res => {
                        thisService.totalCount.next(res.total_count);
                        return res.items;
                      });
    return thisService.orderService
      .fillInDriverAndVehicle(orders$)
      .subscribe(
        res => {
          thisService.orderData.splice((params.page - 1) * params.per_page + iterator++, 1, res);
          thisService.ordersEventSource.next(this.orderData);
      });
  }

  clearData() {
    this.orderData = [];
    this.ordersEventSource.next(this.orderData);
  }
}

interface OrderRequest {
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

  set scheduled(bool: boolean) { this.booleans.set('scheduled', bool); }
  set since(when: Date) { this.dates.set('since', when); }
  set until(when: Date) { this.dates.set('until', when); }
  set waiting(bool: boolean) {
    if (bool) {
      this.status.add('created');
      this.status.add('driver_confirmed');
      this.status.add('driver_arriving');
      this.status.add('driver_arrived');
    } else {
      this.status.delete('created');
      this.status.delete('driver_confirmed');
      this.status.delete('driver_arriving');
      this.status.delete('driver_arrived');
    }
  }
  set ongoing(bool: boolean) {
    if (bool) {
      this.status.add('customer_picked_up');

    } else {
      this.status.delete('customer_picked_up');
    }
  }
  set page(number) { this.numbers.set('page', ++number); }
  get page(): number { return this.numbers.get('page'); }
  set per_page(number) { this.numbers.set('per_page', number); }
  get per_page(): number { return this.numbers.get('per_page'); }

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
