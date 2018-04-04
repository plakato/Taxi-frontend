import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../user/shared/authentication.service';
import { ShiftService } from '../../order/shared/shift.service';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.scss']
})
export class DriverMenuComponent implements OnInit {

  constructor( private authService: AuthenticationService,
              private shiftService: ShiftService,
              private errorService: ErrorService ) { }

  ngOnInit() {
  }

  logout() {
    this.shiftService.endShift().subscribe(
      res =>  this.authService.logout(),
      err =>  this.errorService.showMessageToUser('Odhlásení se nezdařilo.')
    );
  }

}
