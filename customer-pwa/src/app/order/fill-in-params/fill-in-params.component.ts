import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewOrder } from '../order.module';
import { ErrorService } from '../../general/error/error.service';
import { LatLngLiteral } from '@agm/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Constants } from '../../../assets/const';

@Component({
  selector: 'app-fill-in-params',
  templateUrl: './fill-in-params.component.html',
  styleUrls: ['./fill-in-params.component.scss']
})
export class FillInParamsComponent implements OnInit {
  orderForm: FormGroup;
  signedIn = localStorage.getItem("currentUser") != null;
  goingToAirport = false;
  @Output() goingToAirportEmitter = new EventEmitter<boolean>();
  @Input() airport = false;
  

  constructor(private fb: FormBuilder,
              private errorService: ErrorService,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
  // Save params so they can be restored after resfesh.    
    window.addEventListener('unload', this.setParams);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));    
    this.orderService.order.passenger_count = 1;
    this.orderService.order.phone = (currentUser == null)? '': currentUser.phone;
    this.orderForm = this.fb.group({
      persons: [this.orderService.order.passenger_count.toString(), [Validators.required, Validators.min(0)]],
      phone: [this.orderService.order.phone, [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      scheduled: [this.orderService.order.scheduled_pick_up_at != null],
      date: [''],
      time: ['', [Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')]], // TODO: validate that time is in the future.
      note: [this.orderService.order.note == null ? '' : this.orderService.order.note],
      flightNumber: [this.orderService.order.flight_number],
      VIP: [this.orderService.order.VIP == null ? false : this.orderService.order.VIP]
    });
  }

  // Standard order only.
  send() {
    const This = this;
   if (this.setParams()) {
    this.orderService.sendNewOrder().subscribe(
      newOrder => {
        if (This.orderForm.get('scheduled').value) {
          This.router.navigate(['standard-order/scheduled-order-created']);
        } else {
          This.router.navigate(['wait-for-confirmation']);
        }
        console.log('sending order...');
      }
    )     
   }     
  }

  // Only airport orders.
  chooseOtherEndpoint() {
    if (this.setParams()) {
      if (this.orderForm.get('time').value === '' || this.orderForm.get('date').value === '') {
        this.errorService.showMessageToUser('Datum a čas je povinná  položka.');
        return;
      }
      if (this.goingToAirport) {
        this.orderService.order.loc_finish = Constants.DEFAULT_AIRPORT_ADDRESS;
        this.router.navigate(['airport-order/choose-start']);
      } else {
        this.orderService.order.loc_start = Constants.DEFAULT_AIRPORT_ADDRESS;
        this.router.navigate(['airport-order/choose-finish']);        
      }
    }
  }

  // Returns true if successful.
  setParams(): boolean {
    // Set phone number
    if (this.orderForm.get('phone').valid) {
      let formattedNumber = this.orderForm.get('phone').value;
      if (formattedNumber[0] !== '+') {
        formattedNumber = '+420' + formattedNumber;
      }
      this.orderService.order.contact_phone = formattedNumber;
    }
    // Set up if scheduled.
    let scheduled: Date = new Date(Date.now());
    if (this.orderForm.get('scheduled').value) {
      scheduled = new Date(Date.parse(this.orderForm.get('date').value));
      const time: number[] = (this.orderForm.get('time').value).split(':');
      scheduled.setHours(time[0]);
      scheduled.setMinutes(time[1]);
      if (scheduled.getTime() <= Date.now()) {
        this.errorService.showMessageToUser('Termínovaná objednávka na zadaný čas není možná.');
        return false;
      }
      this.orderService.order.scheduled_pick_up_at = scheduled;
    }

    // Set up other params.
    if (this.orderForm.valid) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.orderService.order.driverID = 2; //TODO
      this.orderService.order.passenger_count = this.orderForm.get('persons').value;
      this.orderService.order.note =   this.orderForm.get('note').value; 
      this.orderService.order.VIP = this.orderForm.get('VIP').value;
      this.orderService.order.flight_number = this.orderForm.get('flightNumber') == null ? null : this.orderForm.get('flightNumber').value;
      this.orderService.order.phone = currentUser != null? currentUser.phone : this.orderService.order.contact_phone;
      if (this.airport) {
        this.orderService.order.flight_number = this.orderForm.get('flightNumber').value; }
        return true;
    }
    return false;
  }

  directionChange(toAirport: boolean) {
    this.goingToAirport = toAirport;
    this.goingToAirportEmitter.emit(this.goingToAirport);
  }
  

  // Filter for datepicker - only later than today can be selected.
  filterLaterThanToday = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) >= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }

}
