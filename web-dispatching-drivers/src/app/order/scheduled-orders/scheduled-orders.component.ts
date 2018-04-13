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

  displayedColumns = ['driver', 'car', 'start', 'finish', 'pickUpDate', 'pickUpTime', 'note'];
  dataSource = new ScheduledOrderDataSource(this.scheduledOrderService);

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

  getPickUpDate(order: Order): Date {
    const unixDate: number = Date.parse(order.scheduled_pick_up_at);
    const date: Date = new Date(unixDate);
    return date;
  }
}

export class ScheduledOrderDataSource extends MatTableDataSource<any> {

  // Override filter predicate to read properties recursively.
  // (otherwise the function matches the original.)
  filterPredicate: ((data: Order, filter: string) => boolean) =
    (data: Order, filter: string): boolean => {
    // Transform the data into a lowercase string of all property values.
    const accumulator = (currentTerm, value) => {
      if (typeof(value) === 'object' && value != null) {
        return currentTerm += Object.values(value).reduce(accumulator, currentTerm);
      } else {
        return currentTerm + value;
      }
    };
    const dataStr = Object.values(data).reduce(accumulator, '').toLowerCase();

    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();

    return dataStr.indexOf(transformedFilter) !== -1;
  }

  constructor(private scheduledOrderService: ScheduledOrdersService) {
    super();
    this.scheduledOrderService.ordersEventSource.subscribe(data => this.data = data);
  }
}
