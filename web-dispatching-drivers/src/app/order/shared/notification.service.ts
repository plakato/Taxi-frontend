import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Notification } from '../order.module';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class NotificationService {
  timer: Subscription;

  constructor(private http: HttpClient) { }

  startPollingNotifications() {
    this.stopPollingNotifications();
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

  notifyAboutNewOrder(data) {

  }
}
