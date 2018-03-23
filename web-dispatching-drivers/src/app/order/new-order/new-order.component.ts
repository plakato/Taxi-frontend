import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  driverControl = new FormControl('', Validators.required);
  drivers = [];
  newOrderForm: FormGroup;

  // Filter for datepicker - only later than today can be selected.
  filterLaterThanToday = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) >= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    const now = new Date(Date.now());
    const timeNow = `${now.getHours()}:${now.getMinutes()}`;
    this.newOrderForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      name: [''],
      persons: ['1', Validators.required],
      flightNumber: [''],
      date: [ now, Validators.required],
      time: [ timeNow, [Validators.required, Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')]]
    });
  }

}
