import { Component, OnInit } from '@angular/core';
import { DriverService } from '../shared/driver.service';
import { FormControl, Validators } from '@angular/forms';
import { Driver } from '../order.module';

@Component({
  selector: 'app-list-all-drivers',
  templateUrl: './list-all-drivers.component.html',
  styleUrls: ['./list-all-drivers.component.scss']
})
export class ListAllDriversComponent implements OnInit {

  driverControl = new FormControl('', Validators.required);
  drivers: Driver[];

  constructor(
    private driverService: DriverService ) { }

  ngOnInit() {
    this.driverService.getAllDrivers().subscribe(
      drivers => this.drivers = drivers,
      err => this.drivers = []
    );
  }

  selectedDriver(driver: Driver) {

  }

}
