import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Order } from '../order.module';

@Injectable()
export class MyOrdersService {
  private ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  public readonly orders: Observable<Array<Order>> = this.ordersEventSource.asObservable();
  private ordersData: Order[];

  constructor( private http: HttpClient ) { }

  addOrder(order: Order) {
    this.ordersData.push(order);
    this.ordersEventSource.next(this.ordersData);
  }

}
