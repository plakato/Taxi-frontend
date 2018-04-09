import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/shared/authentication.service';
import { ErrorService } from '../../general/error/error.service';
import { LocationTrackingService } from '../../map/location-tracking.service';
import { ShiftService } from '../../driver/shared/shift.service';
import { MyOrdersService } from '../../order/shared/my-orders.service';

@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.scss']
})
export class DriverMenuComponent implements OnInit {

  constructor( private authService: AuthenticationService,
              private shiftService: ShiftService,
              private errorService: ErrorService,
              private trackingLocation: LocationTrackingService,
              public myOrders: MyOrdersService ) { }

  ngOnInit() {
    // Needs to be here, so that after refresh we'll start sharing location again.
     this.trackingLocation.startSharingLocation();
  }

  logout() {
    this.shiftService.endShift().subscribe(
      res =>  this.authService.logout(),
      err =>  this.errorService.showMessageToUser('Odhlásení se nezdařilo.')
    );
  }

}
