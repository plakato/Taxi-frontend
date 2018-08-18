import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationTrackingService } from '../../map/location-tracking.service';
import { MyOrdersService } from '../../order/shared/my-orders.service';
import { NotificationService } from '../../order/shared/notification.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ShiftService {

  constructor( private http: HttpClient,
              private locationTracking: LocationTrackingService,
              private notifications: NotificationService,
              private myOrders: MyOrdersService ) { }

  startShiftWithCar(carID: number) {
    return this.http.post('shifts/start', JSON.stringify({
      vehicle_id: carID
    })).map(
      success => {
        localStorage.setItem('car', carID.toString());
        this.locationTracking.startSharingLocation();
        this.notifications.startPollingNotifications();
        this.myOrders.startPollingOrders();
      }
    );
  }

  endShift() {
    return this.http.post('shifts/end', JSON.stringify({})).map(
      success => {
        localStorage.setItem('car', null);
        this.locationTracking.stopSharingLocation();
        // Polling notifications will stop automatically.
        this.myOrders.stopPollingOrders();
      }
    );
  }

  isOnPause(): Observable<boolean> {
    return this.http.get('shifts/current').map( (result: any) => {
      if (result.shift == null) {
        return false;
      } else {
        return result.shift.pause;
      }},
      err => false
    );
  }

  pause() {
    return this.http.post('shifts/pause', '');
  }

  resume() {
    return this.http.post('shifts/resume', '');
  }
}
