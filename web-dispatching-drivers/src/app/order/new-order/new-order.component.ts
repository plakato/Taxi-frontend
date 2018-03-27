import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Customer, Order } from '../order.module';
import { OrderService } from '../shared/order.service';
import { MatSnackBar } from '@angular/material';
import { LatLngLiteral } from '@agm/core';

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
  fromLatLng: LatLngLiteral;
  toLatLng: LatLngLiteral;

  // Filter for datepicker - only later than today can be selected.
  filterLaterThanToday = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) >= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }

  constructor( private fb: FormBuilder,
          private customerService: CustomerService,
          private orderService: OrderService,
          private snackbar: MatSnackBar ) { }

  ngOnInit() {
    this.initializeForm();
  }

  confirmOrder() {
    // Check validity.
    if (this.newOrderForm.invalid) {
      this.snackbar.open('Zadaná data nejsou validní.', '', {duration: 2000});
      return;
    }
    if (this.fromLatLng == null) {
      this.snackbar.open('Startovní adresa je povinná.', '', {duration: 2000});
      return;
    }
    // Construct order.
    const order: Order = this.newOrderForm.value;
    if (this.newOrderForm.get('time').value !== '' &&
        this.newOrderForm.get('time').valid) {
          const time: string[] = this.newOrderForm.get('time').value.split(':');
          const pickUp: Date = this.newOrderForm.get('date').value;
          pickUp.setHours(Number(time[0]));
          pickUp.setMinutes(Number(time[1]));
          order.pick_up_at = pickUp.toISOString();
        }
    order.loc_start = this.fromLatLng;
    order.loc_finish = this.toLatLng;
    // Send order.
    this.orderService.createOrder(order).subscribe(
      res => { this.snackbar.open('Objednávka úspěšně vytvořena!', '', {duration: 2000});
              this.initializeForm(); },
      err => this.snackbar.open(err, 'OK', {duration: 2000})
    );

  }

  initializeForm() {
    const now = new Date(Date.now());
    // const timeNow = `${now.getHours()}:${now.getMinutes()}`;
    this.newOrderForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      name: [''],
      passengers: ['1', Validators.required],
      flightNumber: [''],
      date: [ now, Validators.required],
      time: [ '', Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')],
      note: [''],
      VIP: [false]
    });
    this.newOrderForm.markAsPristine();
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
