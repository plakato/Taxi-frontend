import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorIntl, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Order } from '../order.module';
import { OrderService } from '../shared/order.service';
import { OrdersPollingService, OrderRequestParams } from '../shared/data-source/orders-polling.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpParams } from '@angular/common/http';
import { CzechPaginatorIntl } from '../shared/data-source/czech-paginator-intl.service';

@Component({
  selector: 'app-scheduled-orders',
  templateUrl: './scheduled-orders.component.html',
  styleUrls: ['./scheduled-orders.component.scss']
})
export class ScheduledOrdersComponent implements AfterViewInit {

  displayedColumns = ['driver', 'car', 'start', 'finish', 'pickUpDate', 'pickUpTime', 'note'];
  ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  orderData: Order[] = new Array();
  dataSource = new OrderDataSource(this.ordersEventSource);
  totalOrdersCount: BehaviorSubject<number> = new BehaviorSubject(0);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private ordersPollingService: OrdersPollingService) {
  }

  ngAfterViewInit() {
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    this.paginator._intl = new CzechPaginatorIntl();
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
    const This = this;
    this.ordersPollingService.loadPage(params).subscribe(
      res => {
        let iterator = 0;
        this.totalOrdersCount.next(res.totalCount);
        res.item.subscribe(
          order => {
            This.orderData.splice((params.page - 1) * params.per_page + iterator++, 1, order);
            this.ordersEventSource.next(This.orderData);
        });
      }
    );
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

  constructor(private eventSource: BehaviorSubject<Array<Order>>) {
    super();
    eventSource.subscribe(data => this.data = data);
  }
}

