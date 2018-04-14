import { Component, OnInit, Input } from '@angular/core';
import { OrderDataSource } from '../scheduled-orders/scheduled-orders.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  displayedColumns;
  dataSource: OrderDataSource;
  totalOrdersCount: BehaviorSubject<number>;


  constructor() { }

  ngOnInit() {
  }

}
