import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../order.module';
import { Status } from '../../dispatching/order-history/order-history.component';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispatchersPhoneOrdersService {
  polling: any;
  ordersData: OrdersResponseItem[] = [];
  orders: BehaviorSubject<OrdersResponseItem[]> = new BehaviorSubject(this.ordersData);

  constructor(private http: HttpClient) { }

  getDispatchersOrders() {
    return this.http.get<OrdersResponseItem[]>('orders/my');
  }

  startPollingDispatchersOrders() {
    this.stopPollingDispatchersOrders();
    const This = this;
    this.polling = TimerObservable.create(0, 10 * 1000)
      .switchMap(() => This.getDispatchersOrders())
      .subscribe(orders => {
        This.ordersData = orders;
        This.orders.next(this.ordersData);
      });
  }

  stopPollingDispatchersOrders() {
    if (this.polling != null) {
      this.polling.unsubscribe();
    }
  }
}


interface OrdersResponseItem {
    status: Status;
    driver: {id: number, name: string};
    customer: {id: number, name: string, telephone: string};
    arrived_time_orig_est: Date;
    arrived_time_est: Date;
}
