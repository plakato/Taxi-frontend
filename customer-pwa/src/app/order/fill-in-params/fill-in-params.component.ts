import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fill-in-params',
  templateUrl: './fill-in-params.component.html',
  styleUrls: ['./fill-in-params.component.scss']
})
export class FillInParamsComponent implements OnInit {
  orderForm: FormGroup;
  today = Date.now();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      persons: ['1', [Validators.required, Validators.min(0)]],
      phone: ['', [Validators.required, Validators.pattern('\\+?(420)?([0-9]){9,12}'), Validators.maxLength(13)]],
      date: [''],
      time: ['', [Validators.pattern('[0-2]?[0-9]:[0-5][0-9]')]], // TODO: validate that time is in the future.
      note: ['']
    });
  }

  send() {

  }

}
