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
    this.orderService.newOrder.passenger_count = 1;
    this.orderService.newOrder.phone = (currentUser == null)? '': currentUser.phone;
    this.orderForm = this.fb.group({
      persons: [this.orderService.newOrder.passenger_count.toString(), [Validators.required, Validators.min(0)]],
      phone: [this.orderService.newOrder.phone, [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      scheduled: [this.orderService.newOrder.scheduled_pick_up_at != null],
      date: [''],
      time: ['', [Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')]], // TODO: validate that time is in the future.
      note: [this.orderService.newOrder.note == null ? '' : this.orderService.newOrder.note],
      flightNumber: [this.orderService.newOrder.flight_number],
      VIP: [this.orderService.newOrder.VIP == null ? false : this.orderService.newOrder.VIP]
    });
  }

  // Standard order only.
  send() {
    const This = this;
   if (this.setParams()) {
    this.orderService.sendNewOrder().subscribe(
      newOrder => {
        if (This.orderForm.get('scheduled').value) {
          This.router.navigate(['order/standard/scheduled-order-created']);
        } else {
          This.router.navigate(['order/standard/wait-for-confirmation']);
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
        this.orderService.newOrder.loc_finish = Constants.DEFAULT_AIRPORT_ADDRESS;
        this.router.navigate(['order/airport/choose-start']);
      } else {
        this.orderService.newOrder.loc_start = Constants.DEFAULT_AIRPORT_ADDRESS;
        this.router.navigate(['order/airport/choose-finish']);        
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
      this.orderService.newOrder.contact_phone = formattedNumber;
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
      this.orderService.newOrder.scheduled_pick_up_at = new Date(scheduled);      
    }


    // Set up other params.
    if (this.orderForm.valid) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.orderService.newOrder.driverID = 2; //TODO
      this.orderService.newOrder.passenger_count = this.orderForm.get('persons').value;
      this.orderService.newOrder.note =   this.orderForm.get('note').value; 
      this.orderService.newOrder.VIP = this.orderForm.get('VIP').value;
      this.orderService.newOrder.phone = currentUser != null? currentUser.phone : this.orderService.newOrder.contact_phone;
      this.orderService.newOrder.flight_number = this.orderForm.get('flightNumber') == null ? null : this.orderForm.get('flightNumber').value;         
      if (this.orderService.newOrder.flight_number == null) {
        if (this.airport) {
          this.errorService.showMessageToUser('Číslo letu je povinná položka!');
          return false;          
        } else {
          this.orderService.newOrder.flight_number = '';
        }
      } 
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
