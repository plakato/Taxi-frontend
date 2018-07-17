import { Component, OnInit, Input } from '@angular/core';
import { DriversArrivalsService } from '../../drivers-arrivals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-selected',
  templateUrl: './driver-selected.component.html',
  styleUrls: ['./driver-selected.component.scss']
})
export class DriverSelectedComponent implements OnInit {
  
    @Input() arrival;
    @Input() signedIn = false;
  
    constructor(private arrivalsService: DriversArrivalsService,
                private router: Router) { }
  
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

  change() {
    this.router.navigate(['order/standard/change-driver'])
  }


}
