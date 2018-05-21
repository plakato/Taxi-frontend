import { Component, OnInit } from '@angular/core';
import { NewOrder } from '../order.module';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';
import { LatLngLiteral } from '@agm/core';
import { OrderService } from '../order.service';
import { DriversArrivalsService } from '../drivers-arrivals.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  start: { coords: LatLngLiteral, address: string } = { coords: null, address: ''};
  finish: { coords: LatLngLiteral, address: string } = { coords: null, address: ''};
  url: string;
  signedIn = false;

  constructor(private router: Router,
              private errorService: ErrorService,
              private orderService: OrderService,
              private driversArrivalService: DriversArrivalsService) { 
    this.url = this.router.url;
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      this.signedIn = true;
    }
    // On refresh request new arrival times and drivers.
    if (this.url === '/standard-order/fill-in-info') {
      this.driversArrivalService.get(this.start.coords, this.finish.coords); //TODO      
    }
  }

  startChosen() {
    if (this.start.coords != null) {
      this.orderService.order.loc_start = this.start.coords;
      this.orderService.order.startAddress = this.start.address;
      this.router.navigate(['standard-order/choose-finish']);
    } else {
      this.errorService.showMessageToUser('Musíte zvolit nějaký start.');
    }
  }

  finishChosen() {
    this.orderService.order.loc_finish = this.finish.coords;
    this.orderService.order.finishAddress = this.finish.address;
    this.driversArrivalService.get(this.start.coords, this.finish.coords); //TODO
    this.router.navigate(['standard-order/fill-in-info']);
  }

  newStart(newAddress) {
    // To keep the reference.
    this.start.coords = newAddress.coords;
    this.start.address = newAddress.address;
  }

  newFinish(newAddress) {
    // To keep the reference.    
    this.finish.coords = newAddress.cooords;
    this.finish.address = newAddress.address;  
  }

  changeDriver() {
    this.router.navigate(['standard-order/change-driver']);
  }

  getSelectedDriver() {
    if (this.orderService.order.driverID == null) {
      return this.driversArrivalService.arrivals[0].driver.name;
    } else {
      return this.driversArrivalService.getDriver(this.orderService.order.driverID).driver.name;
    }
  }

  getSelectedArrivalTime() {
    const chosen = this.orderService.order.driverID;
    if (chosen == null) {
      return this.driversArrivalService.getMinutes(this.driversArrivalService.arrivals[0].driver.id);
    } else {
      return this.driversArrivalService.getMinutes(chosen);
    }
  }

}
