import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Order } from '../order.module';
import { OrderService } from '../shared/order.service';
import { ScheduledOrdersService } from './data-source/scheduled-orders.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-scheduled-orders',
  templateUrl: './scheduled-orders.component.html',
  styleUrls: ['./scheduled-orders.component.scss']
})
export class ScheduledOrdersComponent implements AfterViewInit {

  displayedColumns = ['driver', 'car', 'start', 'finish', 'pickUpTime', 'note'];
  dataSource = new OrderDataSource(this.scheduledOrderService);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private scheduledOrderService: ScheduledOrdersService) {
  }

  ngAfterViewInit() {
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  clicked() {
    debugger; console.log('jee');
  }
}

export class OrderDataSource extends MatTableDataSource<any> {
  constructor(private scheduledOrderService: ScheduledOrdersService) {
    super();
  }
  connect(): BehaviorSubject<Array<Order>> {
    return this.scheduledOrderService.ordersEventSource;
  }
  disconnect() {}
}
