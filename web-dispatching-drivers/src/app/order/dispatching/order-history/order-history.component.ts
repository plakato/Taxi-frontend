import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, PageEvent } from '@angular/material';
import { Order, Customer } from '../../order.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrdersPollingService, OrderRequestParams } from '../../shared/data-source/orders-polling.service';
import { LatLngLiteral } from '@agm/core';
import { CzechPaginatorIntl } from '../../shared/data-source/czech-paginator-intl.service';
import { OrderDataSource } from '../orders-table/orders-table.component';
import { Driver } from '../../../driver/driver.module';
import { Car } from '../../../car/car.module';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, AfterViewInit {
  intervalForm: FormGroup;
  filter = false;
  orderData: Order[] = [];
  displayedColumns = ['driver', 'car', 'start', 'finish', 'orderCreatedTime',
        'pickUpTime', 'dropOffTime', 'customer', 'orderCreatedType', 'note'];
  ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  dataSource = new OrderDataSource(this.ordersEventSource);
  totalOrdersCount: BehaviorSubject<number> = new BehaviorSubject(0);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Filter for datepicker - only today or earlier upper filter boundary can be selected.
  filterTodayOrEarlierThanUntilDate = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    const today = d.setHours(0, 0, 0, 0);
    const until = this.intervalForm.get('untilDate').value;
    return today <= (new Date(Date.now()).setHours(0, 0, 0, 0)) &&
           (until === '' || today <= (new Date(until).setHours(0, 0, 0, 0)));
  }

  filterTodayOrEarlierThanSinceDate = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    const today = d.setHours(0, 0, 0, 0);
    const since = this.intervalForm.get('sinceDate').value;
    return today <= (new Date(Date.now()).setHours(0, 0, 0, 0)) &&
           (since === '' || today >= (new Date(since).setHours(0, 0, 0, 0)));
  }


  constructor(private fb: FormBuilder,
              private ordersPollingService: OrdersPollingService ) { }

  ngOnInit()  {
    const today = new Date(Date.now());
    this.intervalForm = this.fb.group({
      sinceDate: ['', Validators.required],
      untilDate: [today, Validators.required]
    });
  }

  ngAfterViewInit() {
    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    this.paginator._intl = new CzechPaginatorIntl();
    this.dataSource.paginator = this.paginator;

    this.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
                      pageSize: this.dataSource.paginator.pageSize, length: null});
  }

  onPageChange(event: PageEvent) {
    if (this.filter) {
      this.filterByTime(false);
    } else {
      const params: OrderRequestParams = new OrderRequestParams(event.pageIndex, event.pageSize);
      this.getOrders(params);
    }
  }

  filterByTime(clear: boolean) {
    if (this.intervalForm.invalid) {
      return;
    }
    if (clear) {
      this.orderData = [];
      this.ordersEventSource.next(this.orderData);
    }
    const params: OrderRequestParams = new OrderRequestParams(this.paginator.pageIndex, this.paginator.pageSize);
    params.since = this.intervalForm.get('sinceDate').value;
    params.until = this.intervalForm.get('untilDate').value;
    this.getOrders(params);
    this.filter = true;
  }

  getOrders(params: OrderRequestParams) {
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
    });
  }

}

export interface OrderExtended extends Order {
  id: number;
  arrived_time_est: Date;
  status: Status;
  created_at: Date;
  updated_at: Date;

  driver_id: number;
  vehicle_id: number;
  customer_id: number;
  dispatcher_id: number;

  driver: Driver;
  vehicle: Car;
  customer: Customer;

  address_start: string;
  address_finish: string;
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

export enum Status {
  created = 'created',
  driverConfirmed = 'driver_confirmed',
  driverArriving = 'driver_arriving',
  driverArrived = 'driver_arrived',
  customerPickedUp = 'customer_picked_up',
  finished = 'finished',
  canceled = 'canceled',
  fraud = 'fraud'
}
