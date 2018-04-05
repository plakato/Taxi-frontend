import { Component, OnInit, ViewChild, ElementRef, Input, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { MapService } from '../map.service';
import { ICON_REGISTRY_PROVIDER } from '@angular/material';

@Component({
  selector: 'app-static-marker-map',
  templateUrl: './static-marker-map.component.html',
  styleUrls: ['./static-marker-map.component.scss']
})
export class StaticMarkerMapComponent implements OnInit {
    map: any;
    addressControl: FormControl;
    @Input() placeholder: string;
    @Input() markerCoords: LatLngLiteral;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private mapService: MapService ) {}

    ngOnInit() {
      this.addressControl = new FormControl({value: '', disabled: true});
    }

    initializeMap(map) {
      this.map = map;
      this.map.center = this.markerCoords;
      const Marker = new google.maps.Marker({
        position: this.markerCoords,
        icon: '../../../assets/images/ic_location_on_black_48px.svg'
      });
      Marker.setMap(map);
      this.mapService.getAddress(this.markerCoords).subscribe(
        result => { if (result.formatted_address) {
                        this.addressControl.setValue(result.formatted_address); }},
        err => console.log(err)
      );
    }
  }
