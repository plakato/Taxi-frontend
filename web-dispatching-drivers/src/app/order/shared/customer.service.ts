import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../order.module';

@Injectable()
export class CustomerService {

  constructor( private http: HttpClient ) { }

  getCustomer(phoneOrID: string) {
    return this.http.get<Customer>('customers/' + phoneOrID);
  }

}
