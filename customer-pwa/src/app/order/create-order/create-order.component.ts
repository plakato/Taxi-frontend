import { Component, OnInit } from '@angular/core';
import { NewOrder } from '../order.module';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  order: NewOrder = {} as any;
  url: string;

  constructor(private router: Router,
              private errorService: ErrorService) { 
    this.url = this.router.url;
  }

  ngOnInit() {
  }

  startChosen() {debugger;
    if (this.order.loc_start != null) {
      this.router.navigate(['standard-order/choose-finish']);
    } else {
      this.errorService.showMessageToUser('Musíte zvolit nějaký start.');
    }
  }

  finishChosen() {
    this.router.navigate(['standard-order/fill-in-info']);
  }

  newStart(newAddress) {
    this.order.loc_start = newAddress;
  }

  newFinish(newAddress) {
    this.order.loc_finish = newAddress;
  }

}
