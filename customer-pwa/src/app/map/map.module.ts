import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MapService } from './map.service';
import { StaticMarkerMapComponent } from './static-marker-map/static-marker-map.component';
import { MyLocationService } from './my-location.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-ESM4gOyIJqBJoxJqWain_kI_U-tsJJE',
      libraries: ['places']
    })
  ],
  declarations: [  StaticMarkerMapComponent ],
  exports: [ StaticMarkerMapComponent ],
  bootstrap: [ ],
  providers: [MapService, MyLocationService]
})
export class MapModule { }
