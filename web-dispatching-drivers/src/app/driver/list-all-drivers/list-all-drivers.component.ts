import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DriverService } from '../shared/driver.service';
import { FormControl, Validators } from '@angular/forms';
import { Driver } from '../driver.module';

@Component({
  selector: 'app-list-all-drivers',
  templateUrl: './list-all-drivers.component.html',
  styleUrls: ['./list-all-drivers.component.scss']
})
export class ListAllDriversComponent implements OnInit {

  driverControl = new FormControl('', Validators.required);
  drivers: Driver[];
  @Output() selectedDriver = new EventEmitter<number>();

  constructor(
    private driverService: DriverService ) { }

  ngOnInit() {
    this.driverService.getAllDrivers().subscribe(
      drivers => this.drivers = drivers,
      err => this.drivers = []
    );
  }

  selectDriver(driver: Driver) {
    this.selectedDriver.emit(driver.id);
  }

}