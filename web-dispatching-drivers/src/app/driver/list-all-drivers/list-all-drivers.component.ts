import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { DriverService } from '../shared/driver.service';
import { FormControl, Validators } from '@angular/forms';
import { Driver } from '../driver.module';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-list-all-drivers',
  templateUrl: './list-all-drivers.component.html',
  styleUrls: ['./list-all-drivers.component.scss']
})
export class ListAllDriversComponent implements OnInit {

  driverControl = new FormControl('');
  drivers: Driver[];
  @Input() firstSelected: Driver = null;
  @Output() selectedDriver = new EventEmitter<number>();

  constructor(
    private driverService: DriverService ) { }

  ngOnInit() {
    this.driverService.getAllDrivers().subscribe(
      drivers => {
        this.drivers = drivers;
        this.driverControl.setValue(this.firstSelected.id); },
      err => this.drivers = []
    );
  }

  selectDriver(id: number) {
    this.selectedDriver.emit(id == null ? null : id);
  }

}
