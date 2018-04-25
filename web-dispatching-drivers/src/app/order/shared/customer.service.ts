import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../order.module';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  private customers: Map<number, Customer> = new Map();

  constructor( private http: HttpClient ) { }

  getCustomer(phoneOrID: string) {
    if (this.customers[phoneOrID] != null) {
      return Observable.create(observer => { observer.next(this.customers[phoneOrID]); });
    } else {
      const result = this.http.get<Customer>('customers/' + phoneOrID).map(
        cust => { this.customers.set(cust.id, cust);
                    return cust; },
        err => null
      );
      return result;
    }
  }

}
