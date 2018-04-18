import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginatorIntl, PageEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { OrdersPollingService, OrderRequestParams } from '../../shared/data-source/orders-polling.service';
import { CzechPaginatorIntl } from '../../shared/data-source/czech-paginator-intl.service';
import { Order } from '../../order.module';
import { CancelOrderDialogComponent } from '../../../reusable/modals/cancel-order-dialog/cancel-order-dialog.component';
import { OrderService } from '../../shared/order.service';
import { ErrorService } from '../../../general/error/error.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  orderData: Order[] = [];
  dataSource = new OrderDataSource(this.ordersEventSource);
  totalOrdersCount: BehaviorSubject<number> = new BehaviorSubject(0);


  @Input() displayedColumns;
  @Input() params: OrderRequestParams;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersPollingService: OrdersPollingService,
              private dialog: MatDialog,
              private orderService: OrderService,
              private errorService: ErrorService) {}

  ngOnInit() {
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    this.paginator._intl = new CzechPaginatorIntl();
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
                      pageSize: this.dataSource.paginator.pageSize, length: null});
  }

  onPageChange(event: PageEvent) {
    this.params.page = event.pageIndex;
    this.params.per_page =  event.pageSize;
    const This = this;
    this.ordersPollingService.loadPage(this.params).subscribe(
      res => {
        let iterator = 0;
        this.totalOrdersCount.next(res.totalCount);
        res.item.subscribe(
          order => {
            This.orderData.splice((this.params.page - 1) * this.params.per_page + iterator++, 1, order);
            this.ordersEventSource.next(This.orderData);
        });
      }
    );
  }

  cancelOrder(order: Order) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      width: '250px',
      data: { id: order.id }
    });
    const This = this;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
      This.orderService.cancel(order.id).subscribe(
        success => {
          This.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
            pageSize: this.dataSource.paginator.pageSize, length: null});
        },
        err => This.errorService.showMessageToUser('Zrušení objednávky se nepovedlo :(')
      ); }
    });
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
