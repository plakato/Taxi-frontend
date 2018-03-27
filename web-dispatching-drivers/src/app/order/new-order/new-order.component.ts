import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../order.module';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  drivers = [];
  newOrderForm: FormGroup;
  fromAirportEnabled = true;
  selectingDriver = false;
  customer: Customer;

  // Filter for datepicker - only later than today can be selected.
  filterLaterThanToday = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) >= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }

  constructor( private fb: FormBuilder,
          private customerService: CustomerService ) { }

  ngOnInit() {
    const now = new Date(Date.now());
    const timeNow = `${now.getHours()}:${now.getMinutes()}`;
    this.newOrderForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      name: [''],
      persons: ['1', Validators.required],
      flightNumber: [''],
      date: [ now, Validators.required],
      time: [ timeNow, [Validators.required, Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')]]
    });
  }

  confirmOrder() {

  }

  enableFromAirport(yes: boolean) {
    this.fromAirportEnabled = yes;
  }

  phoneNumberChanged() {
    if (this.newOrderForm.get('phoneNumber').valid) {
      let formattedNumber = this.newOrderForm.get('phoneNumber').value;
      if (formattedNumber[0] !== '+') {
        formattedNumber = '+420' + formattedNumber;
      }
      this.customerService.getCustomer(formattedNumber).subscribe(
        customer => this.customer = customer
      );
    }
  }

}
