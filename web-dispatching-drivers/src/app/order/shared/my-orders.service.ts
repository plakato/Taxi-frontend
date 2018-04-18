import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { Order } from '../order.module';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import { OrderService } from './order.service';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { OrderExtended } from '../dispatching/order-history/order-history.component';

@Injectable()
export class MyOrdersService {
  ordersEventSource: BehaviorSubject<Array<OrderExtended>> = new BehaviorSubject(Array());
  // public readonly orders: Observable<Array<OrderExtended>> = this.ordersEventSource.asObservable();
  private ordersData: OrderExtended[] = [];
  polling: Subscription;

  constructor( private http: HttpClient,
              private orderService: OrderService,
              private notifications: NotificationService ) { }

  startPollingOrders() {
    this.mockDebugOrders();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.stopPollingOrders();
    const This = this;
    this.polling = TimerObservable.create(0, 10 * 1000)
      .switchMap(() => this.http.get<MyOrdersResponse>('order_queues/' + currentUser))
      .subscribe(
        res => {
          const orders = res.queue;
          This.orderService.fillInInfo(orders).subscribe(
            order => {
             /* if (This.ordersData[order.id] != null) {
                if (This.ordersData[order.id] !== order) {
                This.ordersData[order.id] = order;
                }
              } else {
                this.notifications.notifyAboutNewOrder(order);
                this.ordersData[order.id] = order;
              }
              this.ordersEventSource.next(this.ordersData);debugger;*/
            }
          );
        });
  }

  stopPollingOrders() {
    if (this.polling != null) {
      this.polling.unsubscribe();
    }
  }

  mockDebugOrders() {
    const This = this;
    this.orderService.get(7).subscribe(
      o => { This.ordersData.push(o);
             This.ordersEventSource.next(this.ordersData); }
    );
    this.orderService.get(4).subscribe(
      o => { This.ordersData.push(o);
             This.ordersEventSource.next(this.ordersData); }
    );
  }

}

interface MyOrdersResponse {
  id: number;
  queue: OrderExtended[];
}
