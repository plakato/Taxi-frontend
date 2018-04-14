import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl, PageEvent } from '@angular/material';
import { Order } from '../order.module';
import { OrderDataSource } from '../scheduled-orders/scheduled-orders.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrdersPollingService, OrderRequestParams } from '../shared/data-source/orders-polling.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, AfterViewInit {
  intervalForm: FormGroup;
  displayedColumns = ['driver', 'car', 'start', 'finish', 'orderCreatedTime',
        'pickUpTime', 'dropOffTime', 'customer', 'orderCreatedType', 'note'];
  dataSource = new OrderDataSource(this.ordersPollingService);
  paginatorIntl = new MatPaginatorIntl();
  totalOrdersCount: BehaviorSubject<number>;
  filter = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filter for datepicker - only today or earlier can be selected.
  filterTodayOrEarlier = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) <= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }


  constructor(private fb: FormBuilder,
              private ordersPollingService: OrdersPollingService ) {
      this.totalOrdersCount = this.ordersPollingService.totalCount;
    }

  ngOnInit()  {
    const today = new Date(Date.now());
    this.intervalForm = this.fb.group({
      sinceDate: [''],
      untilDate: [today]
    });
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

  onPageChange(event: PageEvent) {
    if (this.filter) {
      this.filterByTime();
    } else {
      const params: OrderRequestParams = new OrderRequestParams(event.pageIndex, event.pageSize);
      this.ordersPollingService.loadPage(params);
    }
  }

  filterByTime() {debugger;
    const params: OrderRequestParams = new OrderRequestParams(this.paginator.pageIndex, this.paginator.pageSize);
    params.since = this.intervalForm.get('sinceDate').value;
    params.until = this.intervalForm.get('untilDate').value;
    this.ordersPollingService.loadPage(params);
    this.filter = true;
  }

}

export interface OrderExtended extends Order {
  id: number;
  arrived_time_est: Date;
  status: string;
  created_at: Date;
  updated_at: Date;

  driver_id: number;
  vehicle_id: number;
  customer_id: number;
  dispatcher_id: number;

  loc_start: LatLngLiteral;
  loc_finish: LatLngLiteral;
  passenger_count: number;
  note: string;
  contact_telephone: string;
  estimated_price: number;
  explicitly_chosen_driver: boolean;
  VIP: boolean;
  scheduled_pick_up_at: Date;
  flight_number: string;
  source: string;

  start_est: Date;
  start: Date;
  arrived_time_orig_est: Date;
  arrived_time: Date;
  finish_time_orig_est: Date;
  finish_time: Date;
  picked_up_time: Date;
  picked_up_time_est: Date;
  picked_up_time_orig_est: Date;
}
