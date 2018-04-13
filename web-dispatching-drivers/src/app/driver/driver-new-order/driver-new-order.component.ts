import { Component, OnInit } from '@angular/core';
import { Order } from '../../order/order.module';
import { LatLngLiteral } from '@agm/core';
import { DriverService } from '../shared/driver.service';
import { ErrorService } from '../../general/error/error.service';
import { Router } from '@angular/router';
import { MyOrdersService } from '../../order/shared/my-orders.service';

@Component({
  selector: 'app-driver-new-order',
  templateUrl: './driver-new-order.component.html',
  styleUrls: ['./driver-new-order.component.scss']
})
export class DriverNewOrderComponent implements OnInit {
  order: Order;

  constructor( private driverService: DriverService,
              private errorService: ErrorService,
              private router: Router,
              private myOrders: MyOrdersService ) { }

  ngOnInit() {
    // Mock an order.
    const locStart: LatLngLiteral = {lat: 48.610292, lng: 21.333021};
    const locFinish: LatLngLiteral = {lat: 21.365282, lng: 54.285364};
    this.order = {
      id: 35,
      status: '',
      contact_telephone: '+420111222333',
      loc_start: locStart,
      driver_id: 2,
      driver: null,
      vehicle_id: 2,
      vehicle: null,
      loc_finish: locFinish,
      passengers: 2,
      note: null,
      VIP: false,
      flightNumber: null,
      scheduled_pick_up_at: '2018-04-05T11:12:52.051Z'
    };
    // Play notification sound.
    const audio = new Audio('../../../assets/audio/chimes-glassy.mp3');
    audio.load();
    audio.play();
  }

  acceptOrder() {
    this.driverService.acceptOrder(this.order.id).subscribe(
      order => { this.router.navigate(['drivers']); }
    );
    this.router.navigate(['drivers']);
    this.myOrders.addOrder(this.order);
  }

}
