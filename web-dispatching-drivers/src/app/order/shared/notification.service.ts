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

@Injectable()
export class NotificationService {
  private timer: Subscription;
  driversNotifications: Array<{notification: Notification, seen: boolean}> = [{notification: {subject: "Nova sprava", data: {}, id: 0}, seen: false}];

  constructor(private http: HttpClient,
              private dialog: MatDialog) { }

  startPollingNotifications() {this.notifyAboutNewOrder({order_id:54});
   /* this.stopPollingNotifications();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.timer = TimerObservable.create(0, 10 * 1000)
      .switchMap(() => this.http.get<Notification[]>('notifications/?page=1&per_page=10'))
      .takeWhile(data => JSON.parse(localStorage.getItem('currentUser')).id === currentUser)
      .subscribe(
        notifications => {
          notifications.forEach(n => {
            switch (n.subject) {
              case 'driver_new_order':
                    this.notifyAboutNewOrder(n.data);
                    break;
              case 'dispatching': 
                    if (this.driversNotifications.findIndex(not => not.notification.id === n.id) === -1) {
                      this.driversNotifications.push({notification: n, seen: false});
                    }
            }
          });
        }
      );*/
  }

  stopPollingNotifications() {
    if (this.timer != null) {
      this.timer.unsubscribe();
    }
  }

  notifyAboutNewOrder(notification: any) {
    setTimeout(() => this.dialog.open(DriverNewOrderComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { id: notification.order_id }
    }));
  }
}
