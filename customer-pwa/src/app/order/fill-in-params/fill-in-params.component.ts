import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewOrder } from '../order.module';
import { ErrorService } from '../../general/error/error.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-fill-in-params',
  templateUrl: './fill-in-params.component.html',
  styleUrls: ['./fill-in-params.component.scss']
})
export class FillInParamsComponent implements OnInit {
  orderForm: FormGroup;
  signedIn = localStorage.getItem("currentUser") != null;
  @Output() newOrder = new EventEmitter<NewOrder>();
  @Input() startAddress: { coords: LatLngLiteral, address: string };
  @Input() finishAddress: { coords: LatLngLiteral, address: string };
  

  constructor(private fb: FormBuilder,
              private errorService: ErrorService) { }

  ngOnInit() {debugger;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.orderForm = this.fb.group({
      persons: ['1', [Validators.required, Validators.min(0)]],
      phone: [(currentUser == null)? '': currentUser.phone, [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      scheduled: [false],
      date: [''],
      time: ['', [Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')]], // TODO: validate that time is in the future.
      note: [''],
      VIP: [false]
    });
  }

  send() {
    // format phone number
    if (this.orderForm.get('phone').valid) {
      let formattedNumber = this.orderForm.get('phone').value;
      if (formattedNumber[0] !== '+') {
        formattedNumber = '+420' + formattedNumber;
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
        return;
      }
    }

    // Create order.
    if (this.orderForm.valid) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      const newOrder = {
        phone: currentUser == null? formattedNumber: currentUser.phone,
        driverID: 2, // TODO change
        dispatcherID: 1, //TODO change
        loc_start: null,
        loc_finish: null,
        passenger_count: this.orderForm.get('persons').value,
        note: this.orderForm.get('note').value,
        contact_phone: formattedNumber,
        VIP: this.orderForm.get('VIP').value,
        flight_number: null, // TODO: add
        scheduled_pick_up_at: scheduled
      }
      this.newOrder.emit(newOrder);      
      }
    }
  }

    // Filter for datepicker - only later than today can be selected.
    filterLaterThanToday = (d: Date): boolean => {
      // Set hours so that only days are compared, not time.
      return d.setHours(0, 0, 0, 0) >= (new Date(Date.now()).setHours(0, 0, 0, 0));
    }
}
