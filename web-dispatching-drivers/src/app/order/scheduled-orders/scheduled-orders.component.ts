import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorIntl, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Order } from '../order.module';
import { OrderService } from '../shared/order.service';
import { OrdersPollingService, OrderRequestParams } from '../shared/data-source/orders-polling.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-scheduled-orders',
  templateUrl: './scheduled-orders.component.html',
  styleUrls: ['./scheduled-orders.component.scss']
})
export class ScheduledOrdersComponent implements AfterViewInit {

  displayedColumns = ['driver', 'car', 'start', 'finish', 'pickUpDate', 'pickUpTime', 'note'];
  dataSource = new OrderDataSource(this.ordersPollingService);
  paginatorIntl = new MatPaginatorIntl();
  totalOrdersCount: BehaviorSubject<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private ordersPollingService: OrdersPollingService) {
    this.totalOrdersCount = this.ordersPollingService.totalCount;
  }

  ngAfterViewInit() {
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    this.paginatorIntl.itemsPerPageLabel = 'Položek na stránku:';
    this.paginatorIntl.nextPageLabel = 'Další stránka';
    this.paginatorIntl.previousPageLabel = 'Předchozí stránka';
    this.paginator._intl = this.paginatorIntl;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
                      pageSize: this.dataSource.paginator.pageSize, length: null});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onPageChange(event: PageEvent) {
    const params: OrderRequestParams = new OrderRequestParams(event.pageIndex, event.pageSize);
    params.scheduled = true;
    this.ordersPollingService.loadPage(params);
  }
}




export class OrderDataSource extends MatTableDataSource<any> {

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

  // Override updatePaginator not to change data length.
  // Keep it to what it was set to.
  _updatePaginator(filteredDataLength: number) {
          Promise.resolve().then(() => {
            if (!this.paginator) { return; }

            // If the page index is set beyond the page, reduce it to the last page.
            if (this.paginator.pageIndex > 0) {
              const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
              this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
            }
          });
        }

  constructor(private ordersPollingService: OrdersPollingService) {
    super();
    this.ordersPollingService.ordersEventSource.subscribe(data => this.data = data);
  }
}

