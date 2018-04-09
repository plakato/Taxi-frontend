import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationTrackingService } from '../../map/location-tracking.service';

@Injectable()
export class ShiftService {

  constructor( private http: HttpClient,
              private locationTracking: LocationTrackingService ) { }

  startShiftWithCar(carID: number) {
    return this.http.post('shifts/start', JSON.stringify({
      vehicle_id: carID
    })).map(
      success => this.locationTracking.startSharingLocation()
    );
  }

  endShift() {
    return this.http.post('shifts/end', JSON.stringify({})).map(
      success => this.locationTracking.stopSharingLocation()
    );
  }
}
