import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DriversArrivalsService } from '../drivers-arrivals.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-driver',
  templateUrl: './change-driver.component.html',
  styleUrls: ['./change-driver.component.scss']
})
export class ChangeDriverComponent implements OnInit {
  chosenID: number;

  constructor(private arrivalService: DriversArrivalsService,
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
