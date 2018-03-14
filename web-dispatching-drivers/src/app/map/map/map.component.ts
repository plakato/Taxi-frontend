import { Component, OnInit } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;
  center: LatLngLiteral;
  userLocation: LatLngLiteral;

  ngOnInit() {
    this.userLocation = { lat: 50.421097, lng: 14.915461 };
    this.center = this.userLocation;
  }

  initializeMap(map) {
    this.map = map;
  }

}
