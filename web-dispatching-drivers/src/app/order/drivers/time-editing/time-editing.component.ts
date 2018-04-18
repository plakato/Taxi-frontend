import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-time-editing',
  templateUrl: './time-editing.component.html',
  styleUrls: ['./time-editing.component.scss']
})
export class TimeEditingComponent implements OnInit {

  @Input() time: Date;
  @Output() timeChange = new EventEmitter<Date>();


  constructor() { }

  ngOnInit() {
  }

  add() {
    if (typeof(this.time) === 'string') {
      this.time = new Date(this.time);
    }
    this.time.setMinutes(this.time.getMinutes() + 1);
    this.timeChange.next(this.time);
  }

  subtract() {
    if (typeof(this.time) === 'string') {
      this.time = new Date(this.time);
    }
    this.time.setMinutes(this.time.getMinutes() - 1);
    this.timeChange.next(this.time);
  }
}
