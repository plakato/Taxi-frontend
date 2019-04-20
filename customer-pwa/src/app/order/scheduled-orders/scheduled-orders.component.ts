import { Component, OnInit } from '@angular/core';
import { Order } from '../order.module';
import { OrderService } from '../order.service';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-scheduled-orders',
  templateUrl: './scheduled-orders.component.html',
  styleUrls: ['./scheduled-orders.component.scss']
})
export class ScheduledOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService,
              private errorService: ErrorService) { }

  ngOnInit() {
    const This = this;
    this.orderService.getScheduledOrders().subscribe(
      orders => {
        This.orders.push(...orders);
      },
      err => This.errorService.showMessageToUser('Nezdařilo se načítat Vaše objednávky.')
    );
  }

}
