import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LatLngLiteral } from '@agm/core';
import { Constants } from '../../assets/const';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackDriverService {
  private locationData: LatLngLiteral = {lat: 52, lng: 56};
  private locationSubject: BehaviorSubject<LatLngLiteral> = new BehaviorSubject<LatLngLiteral>(this.locationData);
  public location: Observable<LatLngLiteral> = this.locationSubject.asObservable();
  private trackingInterval = null;
  private id: number;

  constructor(private http: HttpClient) { }

  startTracking(id: number) {
    this.id = id;
    if (this.trackingInterval == null) {
      this.trackingInterval = window.setInterval(() => this.getLocation(), Constants.DRIVER_LOCATION_SHARING_INTERVAL);
    }
  }

  getLocation() {
    const This = this;
    this.http.get<LocationResponse>('driver_locations/' + this.id + '/current').subscribe(
      result => {
        This.locationData = result.loc;console.log(This.locationData);
        This.locationSubject.next(This.locationData);
      }
    );
  }

  stopTracking() {
    window.clearInterval(this.trackingInterval);
  }
}

interface LocationResponse {
  recorded_at: string,
  loc: {
    lat: number,
    lng: number
  }
}
