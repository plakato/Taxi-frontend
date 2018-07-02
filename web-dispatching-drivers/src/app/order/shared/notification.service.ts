import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Notification } from '../order.module';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { DriverNewOrderComponent } from '../drivers/driver-new-order/driver-new-order.component';
import { BehaviorSubject } from 'rxjs';
import { not } from '@angular/compiler/src/output/output_ast';
import { OrderService } from './order.service';

@Injectable()
export class NotificationService {
  private timer: Subscription;
  notifications: Array<{notification: Notification, seen: boolean}>;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private orderService: OrderService ) { 
    window.addEventListener('beforeunload', () => {this.cacheNotifications();});    
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications !== 'undefined' && storedNotifications !== 'null') {
      this.notifications = JSON.parse(storedNotifications);
    } else {
      this.notifications = [];
    }
  }

  startPollingNotifications() {
    this.stopPollingNotifications();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.timer = TimerObservable.create(0, 10 * 1000)
      .switchMap(() => this.http.get<Notification[]>('notifications/?page=1&per_page=10'))
      .takeWhile(data => JSON.parse(localStorage.getItem('currentUser')).id === currentUser)
      .subscribe(
        notifications => {
          notifications.forEach(n => {
            if (this.notifications.findIndex(not => not.notification.id === n.id) === -1) {
              this.notifications.push({notification: n, seen: false});
              switch (n.subject) {
                case 'driver_new_order':
                      this.notifyAboutNewOrder(n);
                      break;
                case 'dispatching': 
                      break;
              }
            }           
          });
        }
      );
  }

  stopPollingNotifications() {
    if (this.timer != null) {
      this.timer.unsubscribe();
    }
  }

  notifyAboutNewOrder(notification: any) {
    const This = this;
    this.orderService.get(notification.data.order_id).subscribe(
      order => {
        setTimeout(() => This.dialog.open(DriverNewOrderComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          data: { order: order}
        }));}
    );


    const index = this.notifications.findIndex(n => n.notification.id === notification.id);
    this.notifications[index].seen = true;
  }

  cacheNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }
}
