import { Component, OnInit, NgZone, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
// Needed for autocorrect to be correcly imported.
import {} from '@types/googlemaps';
import { MapService } from '../map.service';
import { Constants } from '../../../assets/const';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: any;
  addressControl: FormControl;
  airportSelected = false;
  @ViewChild('address')
  public addressElementRef: ElementRef;

  @Input() placeholder: string;
  @Input() airport: boolean;
  @Input() airportEnabled: boolean;
  @Output() airportSelectedOutput = new EventEmitter<boolean>();
  @Output() selectedAddress = new EventEmitter<{latlng: LatLngLiteral, address: string}>();


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService ) {}

  ngOnInit() {
    this.addressControl = new FormControl();

    // Load Places Autocomplete.
    this.mapsAPILoader.load().then(() => {
      // Create bounds to restrics search to selected area.
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(49.959910, 14.266797),
        new google.maps.LatLng(50.757167, 15.340711));
      // Get autocomplete object.
      const autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        componentRestrictions: { country: 'cz' },
        bounds: bounds,
        // Restrict to bounds even when viewport changes.
        strictBounds: true,
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
          const newLatLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
          this.map.center = newLatLng;
          this.selectedAddress.emit({latlng: newLatLng, address: place.formatted_address});
        });
      });
    });
  }

  initializeMap(map) {
    this.map = map;
    this.map.center = Constants.DEFAULT_ADDRESS;
  }

  mapCenterChanged(event) {
    this.mapService.getAddress(event).subscribe(
      result => { if (result.formatted_address) {
                      this.addressControl.setValue(result.formatted_address);
                      this.selectedAddress.emit(
                        { latlng: event,
                          address: result.formatted_address}
                        ); }},
      err => console.log(err)
    );
    // Deselect airport if address was changed.
    if (this.airportSelected &&
        (event.lat.toFixed(5) !== Constants.DEFAULT_AIRPORT_ADDRESS.lat.toFixed(5) ||
         event.lng.toFixed(5) !== Constants.DEFAULT_AIRPORT_ADDRESS.lng.toFixed(5))) {
      this.airportSelected = false;
    }
  }

  selectAirport() {
    // Airport orders have only one end at the airport
    // Disable airport if one end has already selected airport.
    if (!this.airportEnabled) {
     this.airportSelectedOutput.emit(true);
    }
    this.airportSelected = true;
    this.map.setCenter(Constants.DEFAULT_AIRPORT_ADDRESS);
  }

  addressEdited() {
    if (this.addressControl.value === '') {
      this.selectedAddress.emit(null);
    }
  }
}
