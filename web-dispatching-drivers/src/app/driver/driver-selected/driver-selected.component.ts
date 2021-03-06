import { Component, OnInit, Input } from '@angular/core';
import { DriversArrivalsService } from '../shared/drivers-arrivals.service';

@Component({
  selector: 'app-driver-selected',
  templateUrl: './driver-selected.component.html',
  styleUrls: ['./driver-selected.component.scss']
})
export class DriverSelectedComponent implements OnInit {
  
    @Input() arrival;
    @Input() signedIn = false;
  
    constructor(private arrivalsService: DriversArrivalsService) { }
  
    ngOnInit() {
    }
  
    getMinutesToArrival(): number {
      if (this.arrival == null) {
        return null;
      } else {
        const arrived = new Date(this.arrival.arrived_time_est);
        return Math.trunc((arrived.valueOf() - Date.now()) / 1000);
      }
  }
  
}
