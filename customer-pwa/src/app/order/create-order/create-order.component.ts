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
  }

  startChosen() {
    if (this.start.coords != null) {
      if (this.orderService.newOrder == null) { this.orderService.newOrder = {} as any; }
      this.orderService.newOrder.loc_start = this.start.coords;
      this.orderService.newOrder.startAddress = this.start.address;
      this.router.navigate(['order/standard/choose-finish']);
    } else {
      this.errorService.showMessageToUser('Musíte zvolit nějaký start.');
    }
  }

  finishChosen() {
    this.orderService.newOrder.loc_finish = this.finish.coords;
    this.orderService.newOrder.finishAddress = this.finish.address;
    this.driversArrivalService.getArrivals(this.orderService.newOrder);
    this.router.navigate(['order/standard/fill-in-info']);
  }

  newStart(newAddress) {
    // To keep the reference.
    this.start.coords = newAddress.coords;
    this.start.address = newAddress.address;
  }

  newFinish(newAddress) {
    // To keep the reference.
    this.finish.coords = newAddress.coords;
    this.finish.address = newAddress.address;
  }

  changeDriver() {
    this.router.navigate(['order/standard/change-driver']);
  }

  getSelectedDriver() {
    if (this.orderService.newOrder.driverID == null) {
      return this.driversArrivalService.arrivals[0].driver.name;
    } else {
      return this.driversArrivalService.getDriver(this.orderService.newOrder.driverID).driver.name;
    }
  }

  getSelectedArrivalTime() {
    const chosen = this.orderService.newOrder.driverID;
    if (chosen == null) {
      return this.driversArrivalService.getMinutes(this.driversArrivalService.arrivals[0].driver.id);
    } else {
      return this.driversArrivalService.getMinutes(chosen);
    }
  }

  getSelectedArrival() {
    const chosen = this.orderService.newOrder.driverID;
    if (chosen == null) {
      return this.driversArrivalService.arrivals === [] ? null : this.driversArrivalService.arrivals[0];
    } else {
      const This = this;
      return this.driversArrivalService.arrivals.find(arr => arr.driver.id === This.orderService.newOrder.driverID);
    }
  }

}
