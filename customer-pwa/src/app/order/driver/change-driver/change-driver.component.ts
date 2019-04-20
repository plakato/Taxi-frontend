import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { DriversArrivalsService } from '../../drivers-arrivals.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-change-driver',
  templateUrl: './change-driver.component.html',
  styleUrls: ['./change-driver.component.scss']
})
export class ChangeDriverComponent implements OnInit {
  chosenID: number;

  constructor(public arrivalService: DriversArrivalsService,
              private orderService: OrderService,
              private location: Location) { }

  ngOnInit() {
    this.chosenID = this.orderService.newOrder.driverID;
  }

  change(id: number) {
    this.orderService.newOrder.driverID = id;
    // Navigate back.
    this.location.back();
  }
}
