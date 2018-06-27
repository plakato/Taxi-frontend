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
    return this.notificationService.driversNotifications.filter(n => n.seen === false).length;
  }

  getNotifications() {
    return this.notificationService.driversNotifications;
  }

  openNotificationTray() {
    this.notificationService.driversNotifications.forEach(n => n.seen = true);
  }

  resolveNotification(notification: Notification) {
    const index = this.notificationService.driversNotifications.findIndex(n => n.notification.id === notification.id);
    this.notificationService.driversNotifications.splice(index, 1);
  }

}
