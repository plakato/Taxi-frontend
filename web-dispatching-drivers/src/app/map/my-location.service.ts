import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';

const GEOLOCATION_ERRORS = {
  'errors.location.unsupportedBrowser': 'Browser does not support location services',
  'errors.location.permissionDenied': 'You have rejected access to your location',
  'errors.location.positionUnavailable': 'Unable to determine your location',
  'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class MyLocationService {
   private positionSource = new Subject<Position>();
   public positionObservable = this.positionSource.asObservable(); // .retry(1000);

  constructor() {
    this.startWatching();
  }

  private startWatching() {
    if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.watchPosition(
      position => {
        this.positionSource.next(position);
      },
      error => {
        switch (error.code) {
          case 1:
            this.positionSource.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
            break;
          case 2:
            this.positionSource.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
            break;
          case 3:
            this.positionSource.error(GEOLOCATION_ERRORS['errors.location.timeout']);
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 50000
      }
    );
    } else {
      this.positionSource.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
    }
  }


}
