import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationTrackingService } from '../../map/location-tracking.service';
import { MyOrdersService } from '../../order/shared/my-orders.service';

@Injectable()
export class ShiftService {

  constructor( private http: HttpClient,
              private locationTracking: LocationTrackingService,
              private myOrders: MyOrdersService ) { }

  startShiftWithCar(carID: number) {
    return this.http.post('shifts/start', JSON.stringify({
      vehicle_id: carID
    })).map(
      success => {
        this.locationTracking.startSharingLocation();
        this.myOrders.startPollingNotifications();
      }
    );
  }

  endShift() {
    return this.http.post('shifts/end', JSON.stringify({})).map(
      success => {
        this.locationTracking.stopSharingLocation();
        // Polling orders will stop automatically.
      }
    );
  }
}
