import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { StoredUserData } from '../../user/login/login.component';
import { ShiftService } from '../../driver/shared/shift.service';

@Component({
  selector: 'app-dispatching-menu',
  templateUrl: './dispatching-menu.component.html',
  styleUrls: ['./dispatching-menu.component.scss']
})
export class DispatchingMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;
  isAdmin: boolean;
  lastNotificationCount = 0;

  constructor( private authService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.isAdmin = (user.roles.indexOf('admin') > -1);
    this.notificationService.startPollingNotifications();
  }

  logout() {
    this.authService.logout();
  }

  getNotificationCount(): number {
    const count = this.notificationService.notifications.filter(n => n.resolved === false).length;
    if (count !== this.lastNotificationCount && count !== 0) {
      // Play notification sound.
      const audio = new Audio('../../../assets/audio/chimes-glassy.mp3');
      audio.load();
      audio.play();
    }
    this.lastNotificationCount = count;
    return count;
  }

  getNotifications() {
    return this.notificationService.notifications.filter(n => n.resolved === false);
  }


  resolveNotification(id: number) {
    const index = this.notificationService.notifications.findIndex(n => n.notification.id === id);
    this.notificationService.notifications[index].resolved = true;
  }

  ngOnDestroy() {
    // If this component looses its parent properties, this can be put in appComponent.
    const currUser: StoredUserData = JSON.parse(localStorage.getItem('currentUser'));
    if (currUser == null || currUser.roles.indexOf('dispatcher') > -1) {
      this.notificationService.stopPollingNotifications();
    }
  }

}
