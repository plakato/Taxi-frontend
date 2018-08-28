import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../../shared/customer.service';
import { Customer, Order } from '../../order.module';
import { OrderService } from '../../shared/order.service';
import { MatSnackBar, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import { LatLngLiteral } from '@agm/core';
import { ListAllDriversComponent } from '../../../driver/list-all-drivers/list-all-drivers.component';
import { ErrorService } from '../../../general/error/error.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  newOrderForm: FormGroup;
  fromAirportEnabled = true;
  selectingDriver = false;
  customer: Customer;
  startLoc: {latlng: LatLngLiteral, address: string};
  finishLoc: {latlng: LatLngLiteral, address: string};
  driverID: number = null;
  @ViewChild('group') typeSelector: any;

  // Filter for datepicker - only later than today can be selected.
  filterLaterThanToday = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) >= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }

  constructor( private fb: FormBuilder,
          private customerService: CustomerService,
          private orderService: OrderService,
          private snackbar: MatSnackBar,
          private errorService: ErrorService ) { }

  ngOnInit() {
    this.initializeForm();
  }

  confirmOrder(): boolean {
    if (!this.isOrderValid()) {
      return false;
    }
    const order = this.getOrder();
    if (order == null) {
      return false;
    }
    // Send order.
    this.orderService.createOrder(order).subscribe(
      res => { this.snackbar.open('Objednávka úspěšně vytvořena!', '', {duration: 2000});
              this.initializeForm();
              return true; },
      err => {this.snackbar.open(err, 'OK', {duration: 2000});
              return false; }
    );

  }

  getOrder(): Order {
    if (this.driverID == null) {
      this.snackbar.open('Je nutné zvolit řidiče.', '', {duration: 2000});
      return null;
    }

    // Construct order.
    const order: Order = this.newOrderForm.value;
    if (this.newOrderForm.get('time').value !== '' &&
        this.newOrderForm.get('time').valid) {
          const time: string[] = this.newOrderForm.get('time').value.split(':');
          const pickUp: Date = this.newOrderForm.get('date').value;
          pickUp.setHours(Number(time[0]));
          pickUp.setMinutes(Number(time[1]));
          order.scheduled_pick_up_at = pickUp;
        }
    order.loc_start = this.startLoc.latlng;
    order.loc_finish = this.finishLoc.latlng;
    order.address_start = this.startLoc.address;
    order.address_finish = this.finishLoc.address;
    order.driver_id = this.driverID;
    order.contact_telephone = this.customer.telephone;
    return order;
  }

  isOrderValid(): boolean {
    if (this.newOrderForm.invalid) {
      this.snackbar.open('Zadaná data nejsou validní.', '', {duration: 2000});
      return false;
    }
    if (this.startLoc == null) {
      this.snackbar.open('Startovní adresa je povinná.', '', {duration: 2000});
      return false;
    }
    if (this.typeSelector.value === 'airport' &&
        (this.newOrderForm.get('time').value === '' ||
        this.newOrderForm.get('date').value === '')) {
          this.snackbar.open('Pro letištní objednávku je čas povinný!', '', {duration: 2000});
          return false;
    }
    return true;
  }

  selectDriver(driverID: number) {
    this.driverID = driverID;
  }

  initializeForm() {
    const now = new Date(Date.now());
    this.newOrderForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      name: [{value: '', disabled: true}],
      passengers: ['1', [Validators.required, Validators.min(1)]],
      flightNumber: [''],
      date: [ now, Validators.required],
      time: [ '', Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')],
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
    const This = this;
    if (this.newOrderForm.get('phoneNumber').valid) {
      let formattedNumber = this.newOrderForm.get('phoneNumber').value;
      if (formattedNumber[0] !== '+') {
        formattedNumber = '+420' + formattedNumber;
      }
      this.customerService.getCustomer(formattedNumber).subscribe(
        customer => This.customer = customer,
        err => {
          if (err.status === 404) {
            This.customer = { telephone: formattedNumber,
                                id: null, name: null, note: null};
          }
        }
      );
    }
  }

  calculateDriver() {
    if (this.isOrderValid()) {
      // localStorage.setItem('currentOrder', JSON.stringify(order));
      this.selectingDriver = true;
    }
  }

}
