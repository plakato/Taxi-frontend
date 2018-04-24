import { Component, OnInit, Input } from '@angular/core';
import { OrderExtended } from '../../dispatching/order-history/order-history.component';
import { OrderService } from '../../shared/order.service';
import { Router } from '@angular/router';
import { Status } from '../../dispatching/order-history/order-history.component';

@Component({
  selector: 'app-driver-arriving',
  templateUrl: './driver-arriving.component.html',
  styleUrls: ['./driver-arriving.component.scss']
})
export class DriverArrivingComponent implements OnInit {

  @Input() order: OrderExtended;
  status = Status;
  customerAbsent = false;

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
  }

  changePickUpTime(newTime: Date) {
    // We don't listen to response. This request is only informative.
    this.orderService.changeArrivalTime(this.order.id, newTime).subscribe();
  }

  changeDropOffTime(newTime: Date) {
    const This = this;
    this.orderService.changeDropOffTime(this.order.id, newTime).subscribe(
      order => { order.subscribe(o => This.order = o); }
    );
  }

  arrived() {
    const This = this;
    this.orderService.arrived(this.order.id).subscribe(
      order => { order.subscribe(o => This.order = o); }
    );
  }

  pickedUpCustomer() {
    const This = this;
    this.orderService.pickedUpCustomer(this.order.id).subscribe(
      order => { order.subscribe(o => This.order = o); }
    );
  }

  customerNotHere() {
    this.orderService.customerNotHere(this.order.id).subscribe();
    this.customerAbsent = true;
  }

  finished() {
    this.orderService.finish(this.order.id).subscribe();
    // TODO: listen to answer.
  }

  markAsFraud() {
    this.orderService.fraud(this.order.id).subscribe();
    // TODO: listen to answer.
  }
}

