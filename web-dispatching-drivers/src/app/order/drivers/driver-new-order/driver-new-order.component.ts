import { Component, OnInit, Inject } from '@angular/core';
import { Order } from '../../order.module';
import { LatLngLiteral } from '@agm/core';
import { DriverService } from '../../../driver/shared/driver.service';
import { ErrorService } from '../../../general/error/error.service';
import { Router } from '@angular/router';
import { MyOrdersService } from '../../shared/my-orders.service';
import { Status } from '../../dispatching/order-history/order-history.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-driver-new-order',
  templateUrl: './driver-new-order.component.html',
  styleUrls: ['./driver-new-order.component.scss']
})
export class DriverNewOrderComponent implements OnInit {
  order: Order;

  constructor(public dialogRef: MatDialogRef<DriverNewOrderComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any,
              private driverService: DriverService,
              private errorService: ErrorService,
              private orderService: OrderService ) { }

  ngOnInit() {
    // Mock an order.
    const locStart: LatLngLiteral = {lat: 48.610292, lng: 21.333021};
    const locFinish: LatLngLiteral = {lat: 21.365282, lng: 54.285364};
    this.order = {
      id: 35,
      status: Status.created,
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
      scheduled_pick_up_at: new Date('2018-04-05T11:12:52.051Z')
    };
   /* const This = this;
    this.orderService.get(this.data.id).subscribe(
      order => This.order = order
    );*/

    // Play notification sound.
    const audio = new Audio('../../../assets/audio/chimes-glassy.mp3');
    audio.load();
    audio.play();
  }

  acceptOrder() {
    this.driverService.acceptOrder(this.data.id).subscribe(
      order => {
        // this.router.navigate(['drivers']);
        this.dialogRef.close(); }
    );
   // this.router.navigate(['drivers']);
    // this.myOrders.addOrder(this.order);
  }

  refuseOrder() {

  }

}
