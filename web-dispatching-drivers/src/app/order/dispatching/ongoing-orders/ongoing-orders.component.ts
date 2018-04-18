import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrdersTableComponent } from '../orders-table/orders-table.component';
import { MatPaginatorIntl, PageEvent } from '@angular/material';
import { OrdersPollingService, OrderRequestParams } from '../../shared/data-source/orders-polling.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-ongoing-orders',
  templateUrl: './ongoing-orders.component.html',
  styleUrls: ['./ongoing-orders.component.scss']
})
export class OngoingOrdersComponent implements OnInit {

  // Waiting orders.
  waitingDisplayedColumns = ['driver', 'car', 'start', 'finish', 'estPickUpTime', 'source', 'status', 'action'];
  waitingParams: OrderRequestParams = new OrderRequestParams(0, 10);

  // Ongoing orders.
  ongoingDisplayedColumns = ['driver', 'car', 'start', 'finish', 'estDropOffTime', 'source', 'status'];
  ongoingParams: OrderRequestParams = new OrderRequestParams(0, 10);

  // Last finished.
  finishedDisplayedColumns = ['driver', 'car', 'start', 'finish', 'dropOffTime', 'source', 'status'];
  finishedParams: OrderRequestParams = new OrderRequestParams(0, 10);

  constructor() { }

  ngOnInit() {
    this.waitingParams.waiting = true;
    this.ongoingParams.ongoing = true;
    this.finishedParams.finished = true;
  }

}
