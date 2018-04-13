import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { Customer, Order } from '../order.module';
import { OrderService } from '../shared/order.service';
import { MatSnackBar } from '@angular/material';
import { LatLngLiteral } from '@agm/core';
import { DirtyErrorStateMatcher } from '../../reusable/error-state-matcher/error-state-matcher.module';
import { ListAllDriversComponent } from '../../driver/list-all-drivers/list-all-drivers.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  matcher = new DirtyErrorStateMatcher();
  newOrderForm: FormGroup;
  fromAirportEnabled = true;
  selectingDriver = false;
  customer: Customer;
  fromLatLng: LatLngLiteral;
  toLatLng: LatLngLiteral;
  driverID: number = null;

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
          order.scheduled_pick_up_at = pickUp.toISOString();
        }
    order.loc_start = this.fromLatLng;
    order.loc_finish = this.toLatLng;
    order.driver_id = this.driverID;
    order.contact_telephone = this.customer.telephone;
    // Send order.
    this.orderService.createOrder(order).subscribe(
      res => { this.snackbar.open('Objednávka úspěšně vytvořena!', '', {duration: 2000});
              this.initializeForm(); },
      err => this.snackbar.open(err, 'OK', {duration: 2000})
    );

  }

  selectDriver(driverID: number) {
    this.driverID = driverID;
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
      time: [ '', Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')], // TODO: validate that time is in the future.
      note: [''],
      VIP: [false]
    });
    this.selectingDriver = false;
    this.newOrderForm.markAsUntouched();
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
      const getThis = this;
      this.customerService.getCustomer(formattedNumber).subscribe(
        customer => getThis.customer = customer,
        err => {
          if (err.status === 404) {
            getThis.customer = { telephone: getThis.newOrderForm.get('phoneNumber').value,
                                id: null, name: null, note: null};
          }
        }
      );
    }
  }

}
