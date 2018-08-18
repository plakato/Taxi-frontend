import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MapService } from '../map.service';
import { ICON_REGISTRY_PROVIDER } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { Marker } from '@agm/core/services/google-maps-types';
import { MyLocationService } from '../my-location.service';

@Component({
  selector: 'app-static-marker-map',
  templateUrl: './static-marker-map.component.html',
  styleUrls: ['./static-marker-map.component.scss']
})
export class StaticMarkerMapComponent implements OnInit {
    map: any;
    addressControl: FormControl;
    editing = false;
    marker: google.maps.Marker;
    myPosition: Position;
    @Input() placeholder: string;
    @Input() markerCoords: LatLngLiteral;
    @Input() editable: boolean;
    @Output() newAddress = new EventEmitter<LatLngLiteral>();
    @ViewChild('address')
    public addressElementRef: ElementRef;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private mapService: MapService,
      public myLocationService: MyLocationService ) {}

    ngOnInit() {
      const This = this;
      this.addressControl = new FormControl({value: '', disabled: !this.editing});
      this.myLocationService.positionObservable.subscribe(pos => This.myPosition = pos);

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
        });
      });
    });
    }

    initializeMap(map) {
      this.map = map;
      if (this.markerCoords != null && Object.keys(this.markerCoords).length === 2) {
        this.setMapOnLocation(this.markerCoords);
      } else {
        this.editAddress();
      }
    }

    setMapOnLocation(markerCoords: LatLngLiteral) {
      this.map.center = markerCoords;
      this.marker = new google.maps.Marker({
        position: markerCoords,
        icon: '../../../assets/images/ic_location_on_black_48px.svg'
      });
      this.marker.setMap(this.map);
      this.mapService.getAddress(markerCoords).subscribe(
        result => { if (result.formatted_address) {
                        this.addressControl.setValue(result.formatted_address); }},
        err => console.log(err)
      );
    }

    editAddress() {
      this.editing = true;
      this.newAddress.emit(null);
      this.addressControl.enable();
      if (this.marker != null) {
        this.marker.setMap(null);
      }
    }

    submitNewAddress() {
      this.editing = false;
      this.addressControl.disable();
      this.newAddress.emit({lat: this.map.center.lat(),
                            lng: this.map.center.lng()});
      this.setMapOnLocation(this.map.center);
    }

    zoomToMyLocation() {
      const newLoc: LatLngLiteral = { lat: this.myPosition.coords.latitude, lng: this.myPosition.coords.longitude };
     this.map.panTo(newLoc);
    }
  }
