import { Component, OnInit } from '@angular/core';
import {
  MatIcon,
  MatSidenav,
  MatSidenavContainer,
  MatListItem,
  MatToolbar } from '@angular/material';
import { AuthenticationService } from '../../user/shared/authentication.service';
import { User } from '../../user/user.module';
import { NotificationService } from '../../order/shared/notification.service';
import { Notification } from '../../order/order.module';

@Component({
  selector: 'app-dispatching-menu',
  templateUrl: './dispatching-menu.component.html',
  styleUrls: ['./dispatching-menu.component.scss']
})
export class DispatchingMenuComponent implements OnInit {
  isExpanded = false;
  isAdmin: boolean;
  lastUnreadNotificationCount = 0;

  constructor( private authService: AuthenticationService,
              private notificationService: NotificationService ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.isAdmin = (user.roles.indexOf('admin') > -1);
  }

  logout() {
    this.authService.logout();
  }

  getUnreadNotificationCount(): number {
    const count = this.notificationService.notifications.filter(n => n.seen === false).length;
    if (count !== this.lastUnreadNotificationCount && count !== 0) {
      // Play notification sound.
      const audio = new Audio('../../../assets/audio/chimes-glassy.mp3');
      audio.load();
      audio.play();
    }
    this.lastUnreadNotificationCount = count;
    return count;
  }

  getNotifications() {
    return this.notificationService.notifications;
  }

  openNotificationTray() {
    this.notificationService.notifications.forEach(n => n.seen = true);
  }

  resolveNotification(notification: Notification) {
    const index = this.notificationService.notifications.findIndex(n => n.notification.id === notification.id);
    this.notificationService.notifications.splice(index, 1);
  }

}
