import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersTableComponent } from '../orders-table/orders-table.component';

@Component({
  selector: 'app-ongoing-orders',
  templateUrl: './ongoing-orders.component.html',
  styleUrls: ['./ongoing-orders.component.scss']
})
export class OngoingOrdersComponent implements OnInit {

  @ViewChild(OrdersTableComponent)
  private waitingOrdersComp: OrdersTableComponent;

  constructor() { }

  ngOnInit() {
  }

}
