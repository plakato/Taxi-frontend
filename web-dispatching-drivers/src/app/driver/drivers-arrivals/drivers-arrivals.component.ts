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
  arrivals: DriverArrival[] = [];
  // Emits null when an error occured.
  @Output() selectedDriver: EventEmitter<number> = new EventEmitter();

  constructor(private arrivalsService: DriversArrivalsService,
              private errorService: ErrorService) { }

  ngOnInit() {
    const This = this;
    const orderItem = localStorage.getItem('currentOrder');
    if (orderItem === 'null' || orderItem === 'undefined') {
      this.errorService.showMessageToUser('Objednávka nebyla správně vytvořena.')
      this.selectedDriver.emit(null);
      return;
    } 
    const order: OrderExtended = JSON.parse(orderItem);
    this.arrivalsService.getArrivals(order).subscribe(
      arrivals => This.arrivals = arrivals
    );
  }

  selectDriver(id: number) {
    this.selectedDriver.emit(id);
  }

}
