import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Order } from '../../order.module';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { HttpClient } from '@angular/common/http';
import { DriverService } from '../../../driver/shared/driver.service';
import { CarService } from '../../../car/shared/car.service';
import { OrderService } from '../../shared/order.service';

@Injectable()
export class ScheduledOrdersService {
  public totalCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  private readonly orders: Observable<Array<Order>> = this.ordersEventSource.asObservable();
  private orderData: Order[] = new Array();

  constructor( private http: HttpClient,
              private orderService: OrderService) {
    this.loadInitialData();
   }

  loadInitialData() {
    const This = this;
    const orders$ = this.http.get<OrderRequest>('orders/?page=1&per_page=10&scheduled').map(
      res => {
        This.totalCount.next(res.total_count);
        return res.items;
      }
    );
      // Fill in order driver and vehicle from id.
      this.orderService.fillInDriverAndVehicle(orders$)
           .subscribe(
            res => {
              this.orderData.push(res);
              this.ordersEventSource.next(this.orderData); }
          );
  }


  loadPage(page: number, per_page: number) {
    const thisService = this;
    let iterator = 0;
    const orders$ = this.http.get<OrderRequest>('orders/?page=' + (page + 1) + '&per_page=' + per_page + '&scheduled')
                    .map(
                      res => {
                        thisService.totalCount.next(res.total_count);
                        return res.items;
                      });
    // At server pages are numbered starting from 1 (not 0!).
    return thisService.orderService
      .fillInDriverAndVehicle(orders$)
      .subscribe(
        res => {
          thisService.orderData.splice(page * per_page + iterator++, 1, res);
          thisService.ordersEventSource.next(this.orderData);
      });
  }
}

export interface OrderRequest {
  items: Order[];
  total_count: number;
}
