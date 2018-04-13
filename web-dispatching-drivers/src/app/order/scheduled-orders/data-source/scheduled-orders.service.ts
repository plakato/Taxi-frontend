import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Order } from '../../order.module';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { HttpClient } from '@angular/common/http';
import { DriverService } from '../../../driver/shared/driver.service';
import { CarService } from '../../../car/shared/car.service';
import { OrderService } from '../../shared/order.service';

@Injectable()
export class ScheduledOrdersService {

  public ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  private readonly orders: Observable<Array<Order>> = this.ordersEventSource.asObservable();
  private orderData: Order[] = new Array();

  constructor( private http: HttpClient,
              private orderService: OrderService) {
    this.loadInitialData();
   }

  loadInitialData() {
      // Fill in order driver and vehicle from id.
      this.http.get<Order[]>('orders/?page=1&per_page=10&scheduled')
        .pipe(mergeMap( rawOrders => {
            return from(rawOrders).pipe(
              mergeMap( order => this.orderService.fillOrderDriver(order)),
              mergeMap( order => this.orderService.fillOrderVehicle(order))
            );
          })
        ).subscribe(
            res => {
              this.orderData.push(res);
              this.ordersEventSource.next(this.orderData); }
          );
  }


  loadPage(page: number, per_page: number) {
    return this.http.get<Order[]>('orders/?page=' + page + '&per_page=' + per_page + '&scheduled').subscribe(
      res => {
        this.orderData.concat(res);
        this.ordersEventSource.next(this.orderData);
      });
  }
}
