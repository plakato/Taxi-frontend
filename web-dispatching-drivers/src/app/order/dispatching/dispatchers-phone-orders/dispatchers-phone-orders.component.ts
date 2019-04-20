import { Component, OnInit } from '@angular/core';
import { DispatchersPhoneOrdersService } from '../../shared/data-source/dispatchers-phone-orders.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dispatchers-phone-orders',
  templateUrl: './dispatchers-phone-orders.component.html',
  styleUrls: ['./dispatchers-phone-orders.component.scss']
})
export class DispatchersPhoneOrdersComponent implements OnInit {

  constructor(public ordersService: DispatchersPhoneOrdersService) { }

  ngOnInit() {
    this.ordersService.startPollingDispatchersOrders();
  }

  getDelay(order): number {
    const original = new Date(order.arrived_time_est);
    const current = new Date(order.arrived_time_orig_est);
    const timeDiff = Math.abs(current.getTime() - original.getTime());
    return Math.ceil(timeDiff / 3600);
  }

}
