import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-ESM4gOyIJqBJoxJqWain_kI_U-tsJJE'
    })
  ],
  declarations: [ MapComponent ],
  exports: [ MapComponent ],
  bootstrap: [ ]
})
export class MapModule { }
