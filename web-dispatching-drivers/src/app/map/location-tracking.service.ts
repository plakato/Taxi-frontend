import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from '@types/googlemaps';
import { ErrorService } from '../general/error/error.service';

@Injectable()
export class LocationTrackingService {
  trackingInterval = null;

  constructor( private http: HttpClient,
              private errorService: ErrorService ) { }

  startSharingLocation() {
    if (this.trackingInterval !== null) {
      this.stopSharingLocation();
    }
    this.trackingInterval = global.setInterval(this.shareCurrentLocation, 30 * 1000);
  }

  stopSharingLocation() {
    global.clearInterval(this.trackingInterval);
  }

  shareCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
                        this.http.post('driver-locations', JSON.stringify({
                          recorded_at: (new Date(Date.now())).toISOString(),
                          location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                          }
                        })).subscribe(
                          success => {},
                          err => this.errorService.showMessageToUser('Problém se zdílením lokace: ' + err)
                        );
      });
    } else {
      this.errorService.showMessageToUser('Váš prohlížeč nepodporuje zdílení lokace.');
    }
  }
}
