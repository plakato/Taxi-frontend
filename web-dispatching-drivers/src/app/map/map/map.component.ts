import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
// Needed for autocorrect to be correcly imported.
import {} from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;
  center: LatLngLiteral;
  userLocation: LatLngLiteral;
  addressControl: FormControl;

  @ViewChild('address')
  public addressElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ) {}

  ngOnInit() {
    this.userLocation = { lat: 50.421097, lng: 14.915461 };
    this.center = this.userLocation;

    this.addressControl = new FormControl();

    // Load Places Autocomplete.
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // Get the place result.
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // Verify result.
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Set latitude, longitude.
          this.center.lat = place.geometry.location.lat();
          this.center.lng = place.geometry.location.lng();
        });
      });
    });
  }

  initializeMap(map) {
    this.map = map;
  }

  mapCenterChanged($event) {

  }
}
