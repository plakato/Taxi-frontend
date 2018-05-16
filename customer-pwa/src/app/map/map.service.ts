import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper, LatLngLiteral } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare var google: any;

@Injectable()
export class MapService extends GoogleMapsAPIWrapper {
    constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
        super(__loader, __zone);
    }

    public getAddress( coords: LatLngLiteral ): Observable<any> {
        const geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode({'location': coords }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results[0]);
                    observer.complete();
                } else {
                    observer.next({});
                    observer.complete();
                }
            });
        });
    }

    getLatLng(address: string) {
        console.log('Getting Address - ', address);
        const geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();
                } else {
                    observer.next({});
                    observer.complete();
                }
            });
        });
    }

    callResize(map) {
      google.maps.event.trigger(map, 'resize');
    }
}
