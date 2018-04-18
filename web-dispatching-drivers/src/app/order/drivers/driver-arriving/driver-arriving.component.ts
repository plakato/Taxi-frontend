import { Component, OnInit, Input } from '@angular/core';
import { OrderExtended } from '../../dispatching/order-history/order-history.component';
import { OrderService } from '../../shared/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-arriving',
  templateUrl: './driver-arriving.component.html',
  styleUrls: ['./driver-arriving.component.scss']
})
export class DriverArrivingComponent implements OnInit {

  @Input() order: OrderExtended;

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
  }

  changePickUpTime(newTime: Date) {
    // We don't listen to response. This request is only informative.
    this.orderService.changeArrivalTime(this.order.id, newTime).subscribe();
  }

  arrived() {
    this.orderService.arrived(this.order.id).subscribe(
      success => { this.router.navigate(['arrived']); }
    );
  }
}
