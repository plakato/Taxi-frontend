import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ErrorService } from '../../general/error/error.service';
import { OrderExtended } from '../../order/dispatching/order-history/order-history.component';
import { DriversArrivalsService } from '../shared/drivers-arrivals.service';
import { OrderService } from '../../order/shared/order.service';

@Component({
  selector: 'app-selecting-driver',
  templateUrl: './selecting-driver.component.html',
  styleUrls: ['./selecting-driver.component.scss']
})
export class SelectingDriverComponent implements OnInit {

  @Output() selectedDriver: EventEmitter<number> = new EventEmitter();
  selecting = false;
  order: OrderExtended;

  constructor(private errorService: ErrorService,
              private arrivalsService: DriversArrivalsService) { }

  ngOnInit() {
    const This = this;
    const orderItem = localStorage.getItem('currentOrder');
    if (orderItem === 'null' || orderItem === 'undefined') {
      this.errorService.showMessageToUser('Objednávka nebyla správně vytvořena.')
      this.selectedDriver.emit(null);
      return;
    } 
    const order: OrderExtended = JSON.parse(orderItem);
    this.order = order;
    this.arrivalsService.getArrivals(order).subscribe(arrivals => {
      This.order.driver_id = arrivals[0].driver.id;
      This.selectedDriver.emit(This.order.driver_id);
    });
  }

  selectDriver(id: number) {
    this.order.driver_id = id;
    this.selectedDriver.emit(id); 
    this.selecting = false;
  }

  getSelected() {
    const index = this.arrivalsService.arrivals.findIndex(arr => arr.driver.id === this.order.driver_id);
    return this.arrivalsService.arrivals[index];
  }
}
