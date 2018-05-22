import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MapService } from '../map.service';
import { ICON_REGISTRY_PROVIDER } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { Marker } from '@agm/core/services/google-maps-types';
import {} from '@types/googlemaps';
import { MyLocationService } from '../my-location.service';
import { Constants } from '../../../assets/const';
import { TrackDriverService } from '../track-driver.service';

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
    myPosition: Position = null;

    @Input() trackDriverID: number = null;
    @Input() placeholder: string;
    @Input() editable: boolean = false;
    @Output() newAddress = new EventEmitter<{coords: LatLngLiteral, address:string}>();
    @ViewChild('address')
    public addressElementRef: ElementRef;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private mapService: MapService,
      public myLocationService: MyLocationService,
      private driverTracking: TrackDriverService ) {}

    ngOnInit() {
      const This = this;
      this.myLocationService.positionObservable.subscribe(pos => This.myPosition = pos);

      if (this.trackDriverID == null) {
        this.addressControl = new FormControl({value: '', disabled: !this.editing});        
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
     
    }

    initializeMap(map) {
      const This = this;
      this.map = map;
      this.zoomToMyLocation();
      if (this.trackDriverID == null) {
        this.map.addListener('idle', () => this.mapIdle() )
        this.editAddress();        
      } else {
        this.driverTracking.startTracking(this.trackDriverID);
        this.driverTracking.location.subscribe(
          newLoc => {
            if (newLoc == null) {return;}
            if (This.marker != null) {This.marker.setMap(null);}
            This.marker = new google.maps.Marker({
              position: newLoc,
              icon: '../../../assets/images/round-directions_car-24px.svg'
            });
            This.marker.setMap(This.map);
            This.map.panTo(newLoc);
          });
      }
    }

    setMapOnLocation(markerCoords: LatLngLiteral) {
      this.map.panTo(markerCoords);
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
      this.newAddress.emit({ coords: null, address:''});
      this.addressControl.enable();
      if (this.marker != null) {
        this.marker.setMap(null);
      }
    }

    submitNewAddress() {
      this.editing = false;
      const newPlace = { lat: this.map.center.lat(), lng: this.map.center.lng()};
      this.newAddress.emit({coords: newPlace, address:  this.addressControl.value});
      this.setMapOnLocation(this.map.center);
      this.addressControl.disable();      
    }

    zoomToMyLocation() {
      let newLoc: LatLngLiteral;
      if (this.myPosition != null) {
         newLoc = { lat: this.myPosition.coords.latitude, lng: this.myPosition.coords.longitude };
      } else {
        newLoc = Constants.DEFAULT_ADDRESS;
      }
      this.map.panTo(newLoc);
    }

    mapIdle() {
      if (this.editing) {
        this.mapService.getAddress(this.map.center).subscribe(
          result => { if (result.formatted_address) {
                          this.addressControl.setValue(result.formatted_address); }},
          err => console.log(err)
        );
      }
    }
  
  }
