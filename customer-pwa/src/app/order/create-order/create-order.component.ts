import { Component, OnInit } from '@angular/core';
import { NewOrder } from '../order.module';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';
import { LatLngLiteral } from '@agm/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  start: { coords: LatLngLiteral, address: string } = { coords: null, address: ''};
  finish: { coords: LatLngLiteral, address: string } = { coords: null, address: ''};
  url: string;

  constructor(private router: Router,
              private errorService: ErrorService,
              private orderService: OrderService) { 
    this.url = this.router.url;
  }

  ngOnInit() {
  }

  startChosen() {
    if (this.start.coords != null) {
      this.router.navigate(['standard-order/choose-finish']);
    } else {
      this.errorService.showMessageToUser('Musíte zvolit nějaký start.');
    }
  }

  finishChosen() {
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

  sendNewOrder(order: NewOrder) {
    order.loc_start = this.start.coords;
    order.loc_finish = this.finish.coords;
    this.orderService.createOrder(order).subscribe(
      newOrder => {
        // TODO
        console.log('sending order...');
      }
    )
  }


}
