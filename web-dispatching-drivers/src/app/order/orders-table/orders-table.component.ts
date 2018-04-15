import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderDataSource } from '../scheduled-orders/scheduled-orders.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginatorIntl, PageEvent, MatPaginator, MatSort } from '@angular/material';
import { OrdersPollingService, OrderRequestParams } from '../shared/data-source/orders-polling.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  dataSource = new OrderDataSource(this.ordersPollingService);
  paginatorIntl = new MatPaginatorIntl();
  totalOrdersCount: BehaviorSubject<number>;

  @Input() displayedColumns;
  @Input() params: OrderRequestParams;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersPollingService: OrdersPollingService) {
    this.totalOrdersCount = this.ordersPollingService.totalCount;
  }

  ngOnInit() {
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    this.paginatorIntl.itemsPerPageLabel = 'Položek na stránku:';
    this.paginatorIntl.nextPageLabel = 'Další stránka';
    this.paginatorIntl.previousPageLabel = 'Předchozí stránka';
    this.paginator._intl = this.paginatorIntl;
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
                      pageSize: this.dataSource.paginator.pageSize, length: null});
  }

  onPageChange(event: PageEvent) {debugger;
    this.params.page = event.pageIndex;
    this.params.per_page =  event.pageSize;
    this.ordersPollingService.loadPage(this.params);
  }
}
