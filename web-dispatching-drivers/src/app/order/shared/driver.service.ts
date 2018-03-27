import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from '../order.module';
import { User } from '../../user/user.module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DriverService {

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
}
