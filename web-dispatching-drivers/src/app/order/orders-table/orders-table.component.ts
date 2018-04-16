import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderDataSource } from '../scheduled-orders/scheduled-orders.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginatorIntl, PageEvent, MatPaginator, MatSort } from '@angular/material';
import { OrdersPollingService, OrderRequestParams } from '../shared/data-source/orders-polling.service';
import { CzechPaginatorIntl } from '../shared/data-source/czech-paginator-intl.service';
import { Order } from '../order.module';

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

  constructor(private ordersPollingService: OrdersPollingService) {}

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
}
