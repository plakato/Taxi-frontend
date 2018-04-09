import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../order.module';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { HttpClient } from '@angular/common/http';
import { DriverService } from '../../../driver/shared/driver.service';
import { CarService } from '../../../car/shared/car.service';

@Injectable()
export class ScheduledOrdersService {

  public ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  private readonly orders: Observable<Array<Order>> = this.ordersEventSource.asObservable();
  private orderData: Order[];

  constructor( private http: HttpClient,
              private driverService: DriverService,
              private carService: CarService) {
    this.loadInitialData();
   }

  loadInitialData() {
      const driverService = this.driverService;
      const fillOrderDriver = function(order): Observable<Order>{
        return driverService.getDriver(order.driver_id).map(driver => {
          const o = order;
          o.driver = driver;
          return o;
        });
      };

      this.http.get<Order[]>('orders/?page=1&per_page=10&scheduled')
        .pipe(switchMap( rawOrders => {
            return forkJoin(
              ...rawOrders.map(fillOrderDriver)
            );
          })).subscribe(
            res => {
              this.orderData = res;
              this.ordersEventSource.next(this.orderData); }
          );

// ORIGINAL
    /*      .subscribe(
          res => {
            res = res.map( order => {
                            this.driverService.getDriver(order.driver_id)
                                              .subscribe( driver => { order.driver = driver; debugger;
                                                                      return order;
                                                                    });
                            return order;
            });debugger;
            this.orderData = res;
            this.ordersEventSource.next(this.orderData);
          });
        });*/
  }

  loadPage(page: number, per_page: number) {
    return this.http.get<Order[]>('orders/?page=' + page + '&per_page=' + per_page + '&scheduled').subscribe(
      res => {
        this.orderData.concat(res);
        this.ordersEventSource.next(this.orderData);
      });
  }
}
