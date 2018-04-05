import { Component, OnInit } from '@angular/core';
import { Order } from '../../order/order.module';
import { LatLngLiteral } from '@agm/core';
import { DriverService } from '../driver.service';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-driver-new-order',
  templateUrl: './driver-new-order.component.html',
  styleUrls: ['./driver-new-order.component.scss']
})
export class DriverNewOrderComponent implements OnInit {
  order: Order;

  constructor( private driverService: DriverService,
              private errorService: ErrorService) { }

  ngOnInit() {
    // Mock an order.
    const locStart: LatLngLiteral = {lat: 48.610292, lng: 21.333021};
    const locFinish: LatLngLiteral = {lat: 21.365282, lng: 54.285364};
    this.order = {
      id: 4,
      phoneNumber: '+420111222333',
      loc_start: locStart,
      driver_id: 2,
      loc_finish: locFinish,
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

  acceptOrder() {
    this.driverService.acceptOrder(this.order.id).subscribe(
      order => {}
    );
  }

}
