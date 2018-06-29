import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { Order } from '../order.module';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/finally';

import { OrderService } from './order.service';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { OrderExtended, Status } from '../dispatching/order-history/order-history.component';
import { DriverService } from '../../driver/shared/driver.service';

@Injectable()
export class MyOrdersService {
  ordersEventSource: BehaviorSubject<Array<OrderExtended>> = new BehaviorSubject(Array());
  // public readonly orders: Observable<Array<OrderExtended>> = this.ordersEventSource.asObservable();
  // This array is indexed with string not to generate void elements.
  private ordersData: OrderExtended[] = [];
  polling: Subscription;

  constructor( private http: HttpClient,
              private orderService: OrderService,
              private notifications: NotificationService,
              private driverService: DriverService ) { }

  startPollingOrders() {
    // this.mockDebugOrders();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.stopPollingOrders();
    const This = this;
    this.polling = TimerObservable.create(0, 10 * 1000)
      .switchMap(() => This.http.get<MyOrdersResponse>('order_queues/' + currentUser))
      .subscribe(
        res => {
          const orders = res.queue;
          const newOrders = [];
          This.orderService.fillInInfo(orders)
            .finally(() => {
              This.ordersData = newOrders.filter(order => order.status !== Status.finished).sort(this.compareByStartTime);
              if (This.ordersData.length > 0 && This.ordersData[0].status === Status.driverConfirmed) {
                This.orderService.arriving(This.ordersData[0].id).subscribe(
                  order => {
                    This.ordersData[0] = order;
                    This.ordersEventSource.next(This.ordersData);
                  }
                );
              }/* else if (This.ordersData.length > 0 && This.ordersData[0].status === Status.created){ //debug purposes
                This.driverService.acceptOrder(This.ordersData[0].id).subscribe();
              } */
              This.ordersEventSource.next(This.ordersData);
            })  
          .subscribe(
            order => {
                newOrders.push(order);
              },
            err => {},
            () => {
              
            }
          );
        });
  }

  stopPollingOrders() {
    if (this.polling != null) {
      this.polling.unsubscribe();
    }
  }

  compareByStartTime(a: OrderExtended, b: OrderExtended) {
    if (a.start_est < b.start_est) {
      return -1;
    }
    if (a.start_est > b.start_est) {
      return 1;
    }
    return 0;
  }

  private mockDebugOrders() {
    const This = this;
    this.orderService.get(7).subscribe(
      o => { // This.ordersData.push(o);
             This.ordersEventSource.next(this.ordersData); }
    );
    this.orderService.get(4).subscribe(
      o => { // This.ordersData.push(o);
             This.ordersEventSource.next(this.ordersData); }
    );
  }

}

interface MyOrdersResponse {
  id: number;
  queue: OrderExtended[];
}
