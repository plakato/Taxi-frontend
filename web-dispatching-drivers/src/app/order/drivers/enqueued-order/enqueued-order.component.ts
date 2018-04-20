import { Component, OnInit, Input } from '@angular/core';
import { OrderExtended } from '../../dispatching/order-history/order-history.component';

@Component({
  selector: 'app-enqueued-order',
  templateUrl: './enqueued-order.component.html',
  styleUrls: ['./enqueued-order.component.scss']
})
export class EnqueuedOrderComponent implements OnInit {

  @Input() order: OrderExtended;

  constructor() { }

  ngOnInit() {
  }

}
