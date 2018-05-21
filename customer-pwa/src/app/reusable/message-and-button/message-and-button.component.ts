import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-and-button',
  templateUrl: './message-and-button.component.html',
  styleUrls: ['./message-and-button.component.scss']
})
export class MessageAndButtonComponent implements OnInit {
  @Input() message: string;
  @Input() buttonText: string;
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clicked.emit();
  }

}
