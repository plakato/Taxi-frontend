import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../user/shared/authentication.service';
import { ErrorService } from '../../general/error/error.service';
import { LocationTrackingService } from '../../map/location-tracking.service';
import { ShiftService } from '../../driver/shared/shift.service';
import { MyOrdersService } from '../../order/shared/my-orders.service';
import { StoredUserData } from '../../user/login/login.component';
import { NotificationService } from '../../order/shared/notification.service';
import { OrderExtended } from '../../order/dispatching/order-history/order-history.component';
import { Status } from '../../order/dispatching/order-history/order-history.component';
import { MatSnackBar } from '@angular/material';

/** This component is considered a parent holder for all screens in (logged in) driver's view. */
@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.scss']
})
export class DriverMenuComponent implements OnInit, OnDestroy {

  status = Status;
  pause = false;

  constructor( private authService: AuthenticationService,
              private shiftService: ShiftService,
              private errorService: ErrorService,
              private notifications: NotificationService,
              private trackingLocation: LocationTrackingService,
              public myOrders: MyOrdersService,
              private snackbar: MatSnackBar ) { }

  ngOnInit() {
    // If this component looses its parent properties, this can be put in appComponent.
    const currUser: StoredUserData = JSON.parse(localStorage.getItem('currentUser'));
    if (currUser.roles.indexOf('driver') > -1) {
      this.trackingLocation.startSharingLocation();
      this.myOrders.startPollingOrders();
      this.notifications.startPollingNotifications();
      this.checkDriverOnPause();
    }
  }

  logout() {
    this.shiftService.endShift().subscribe(
      res =>  this.authService.logout(),
      err =>  this.errorService.showMessageToUser('Odhlásení se nezdařilo.')
    );
  }

  checkDriverOnPause() {
    const This = this;
    this.shiftService.isOnPause().subscribe(result => {
      This.pause = result;
    });
  }


  getEnqueuedOrders(): OrderExtended[] {
    return this.myOrders.ordersEventSource.value.slice(1);
  }

  pauseShift() {
    const This = this;
    this.shiftService.pause().subscribe(
      success => {
        This.pause = true;
        this.snackbar.open('Máte naplánovanú pauzu! Nejprve ale vyřiďte zbývající objednávky.', '', {duration: 3000});
      }
    );
  }

  resumeShift() {
    const This = this;
    this.shiftService.resume().subscribe(
      success => This.pause = false
    );
  }

  active(): boolean {
    if (this.myOrders.ordersEventSource.value[0].status === Status.driverArrived ||
        this.myOrders.ordersEventSource.value[0].status === Status.driverArriving ||
        this.myOrders.ordersEventSource.value[0].status === Status.customerPickedUp) {
          return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    // If this component looses its parent properties, this can be put in appComponent.
    const currUser: StoredUserData = JSON.parse(localStorage.getItem('currentUser'));
    if (currUser == null || currUser.roles.indexOf('driver') > -1) {
      this.trackingLocation.stopSharingLocation();
      this.myOrders.stopPollingOrders();
      this.notifications.stopPollingNotifications();
    }
  }

}
