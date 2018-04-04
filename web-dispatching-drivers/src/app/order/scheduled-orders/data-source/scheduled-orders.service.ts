import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '../../order.module';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScheduledOrdersService {

  public ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  private readonly orders: Observable<Array<Order>> = this.ordersEventSource.asObservable();
  private orderData: Order[];

  constructor( private http: HttpClient) {
    this.loadInitialData();
   }

  loadInitialData() {
      return this.http.get<Order[]>('orders/?page=1&per_page=10&scheduled').subscribe(
      res => {
        this.orderData = res;
        this.ordersEventSource.next(this.orderData);
      });
  }

  loadPage(page: number, per_page: number) {
    return this.http.get<Order[]>('orders/?page=' + page + '&per_page=' + per_page + '&scheduled').subscribe(
      res => {
        this.orderData.concat(res);
        this.ordersEventSource.next(this.orderData);
      });
  }
}
