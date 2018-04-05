import { Component, OnInit } from '@angular/core';
import { Order } from '../../order/order.module';

@Component({
  selector: 'app-driver-new-order',
  templateUrl: './driver-new-order.component.html',
  styleUrls: ['./driver-new-order.component.scss']
})
export class DriverNewOrderComponent implements OnInit {
  order: Order;

  constructor() { }

  ngOnInit() {
    // Mock an order.
    this.order = {
      phoneNumber: '+420111222333',
      loc_start: {
        lat: 21.25364,
        lng: 54.153265
      },
      driver_id: 2,
      loc_finish: {
        lat: 21.365282,
        lng: 54.285364
      },
      passengers: 2,
      note: null,
      VIP: false,
      flightNumber: null,
      pick_up_at: '2018-04-05T11:12:52.051Z'
    };
    // Play notification sound.
    const audio = new Audio('../../../assets/audio/chimes-glassy.mp3');
    audio.load();
    audio.play();
  }

}
