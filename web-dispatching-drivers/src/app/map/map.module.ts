import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { MatIconModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MapService } from './map.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-ESM4gOyIJqBJoxJqWain_kI_U-tsJJE',
      libraries: ['places']
    })
  ],
  declarations: [ MapComponent ],
  exports: [ MapComponent ],
  bootstrap: [ ],
  providers: [MapService]
})
export class MapModule { }
