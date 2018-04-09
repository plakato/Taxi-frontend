import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from '../driver.module';
import { User } from '../../user/user.module';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../order/order.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DriverService {

  private driversEventSource: BehaviorSubject<Map<number, Driver>> = new BehaviorSubject(new Map());
  public readonly drivers: Observable<Map<number, Driver>> = this.driversEventSource.asObservable();
  private driversData: Map<number, Driver> = new Map();

  constructor( private http: HttpClient ) { }

  getAllDrivers() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.roles.indexOf('admin') > -1) {
      return <Observable<Driver[]>>this.http.get<User[]>('employees').map(
        users => users.filter( u => u.employee_roles
                                        .map( x => x.role )
                                        .indexOf('driver') > -1)
      );
    } else {
      return this.http.get<Driver[]>('employees');
    }
  }

  acceptOrder(orderID: number) {
    return this.http.patch<Order>('orders/' + orderID + '/confirm_by_driver', JSON.stringify({}));
  }

  getDriver(id: number): Observable<Driver> {
    if (this.driversData[id] != null) {
      return Observable.create(observer => { observer.next(this.driversData[id]); });
    } else {
      const result = this.http.get<Driver>('employees/' + id).map(
        driver => { this.driversData.set(driver.id, driver);
                    this.driversEventSource.next(this.driversData);
                    return driver; },
        err => null
      );
      return result;
    }
  }
}
