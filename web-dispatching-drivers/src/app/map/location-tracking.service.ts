import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from '@types/googlemaps';
import { ErrorService } from '../general/error/error.service';
import { Constants } from '../../assets/const';

@Injectable()
export class LocationTrackingService {
  trackingInterval = null;

  constructor( private http: HttpClient,
              private errorService: ErrorService ) { }

  startSharingLocation() {
    if (this.trackingInterval !== null) {
      return;
    }
    this.trackingInterval = window.setInterval(() => this.shareCurrentLocation(), Constants.DRIVER_LOCATION_SHARING_INTERVAL);
  }

  stopSharingLocation() {
    window.clearInterval(this.trackingInterval);
  }

  shareCurrentLocation() {
    if (navigator.geolocation) {
      const http = this.http;
      navigator.geolocation.getCurrentPosition(
        (position) => {
                        http.post('driver_locations', JSON.stringify({
                          recorded_at: (new Date(Date.now())).toISOString(),
                          loc: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                          }
                        })).subscribe(
                          success => { console.log('location was shared!!!!'); },
                          err => this.errorService.showMessageToUser('Problém se zdílením lokace: ' + err)
                        );
      });
    } else {
      this.errorService.showMessageToUser('Váš prohlížeč nepodporuje zdílení lokace.');
    }
  }
}
