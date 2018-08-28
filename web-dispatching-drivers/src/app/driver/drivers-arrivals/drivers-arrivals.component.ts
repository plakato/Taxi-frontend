import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DriversArrivalsService, DriverArrival } from '../shared/drivers-arrivals.service';
import { ErrorService } from '../../general/error/error.service';
import { OrderExtended } from '../../order/dispatching/order-history/order-history.component';

@Component({
  selector: 'app-drivers-arrivals',
  templateUrl: './drivers-arrivals.component.html',
  styleUrls: ['./drivers-arrivals.component.scss']
})
export class DriversArrivalsComponent implements OnInit {
  // Emits null when an error occured.
  @Output() selectedDriver: EventEmitter<number> = new EventEmitter();

  constructor(public arrivalsService: DriversArrivalsService) { }

  ngOnInit() {
  }

  selectDriver(id: number) {
    this.selectedDriver.emit(id);
  }

}
