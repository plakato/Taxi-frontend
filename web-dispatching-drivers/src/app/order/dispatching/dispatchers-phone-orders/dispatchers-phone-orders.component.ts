import { Component, OnInit } from '@angular/core';
import { DispatchersPhoneOrdersService } from '../../shared/data-source/dispatchers-phone-orders.service';

@Component({
  selector: 'app-dispatchers-phone-orders',
  templateUrl: './dispatchers-phone-orders.component.html',
  styleUrls: ['./dispatchers-phone-orders.component.scss']
})
export class DispatchersPhoneOrdersComponent implements OnInit {

  constructor(private ordersService: DispatchersPhoneOrdersService) { }

  ngOnInit() {
    this.ordersService.startPollingDispatchersOrders();
  }

}
