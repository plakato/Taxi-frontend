import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { Order } from '../order.module';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import { Notification } from '../order.module';

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

  startPollingNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    interval(10 * 1000)
      .switchMap(() => this.http.get<Notification[]>('notifications/?page=1&per_page=10'))
      .takeWhile(data => JSON.parse(localStorage.getItem('currentUser')).id === currentUser)
      .subscribe(
        notifications => {
          notifications.forEach(n => {
            switch (n.subject) {
              case 'driver_new_order':
                    this.notifyAboutNewOrder(n.data);
            }
          });
        }
      );
  }

  notifyAboutNewOrder(data) {

  }

}
