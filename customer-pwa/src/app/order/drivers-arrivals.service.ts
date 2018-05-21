import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLngLiteral } from '@agm/core';
import { DriversArrival } from './order.module';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversArrivalsService implements OnInit{
  public arrivals: DriversArrival[] = [];
  now = Date.now();
  start: LatLngLiteral;
  finish: LatLngLiteral;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (this.start != null) {
      this.get(this.start, this.finish);
    }
  }

  get(start: LatLngLiteral, finish: LatLngLiteral) {
    this.start = start;
    this.finish = finish;
    this.arrivals = [
      { driver: {name: 'Carlos', id: 2 },
        arrivalTime: new Date(Date.now()),
        car: {name: 'Audi', id: 2} },
      { driver: {name: 'Giovanni', id: 3 },
      arrivalTime: new Date(Date.now()),
      car: {name: 'BMW', id: 3} },
      { driver: {name: 'Giorgio', id: 4 },
      arrivalTime: new Date(Date.now()),
      car: {name: 'Mazda', id: 4} },
    ]
  }

  getAllDrivers() {
    return from([
      { name: 'Carlos'},
      { name: 'Juan'},
      { name: 'Desperados'}     
    ]);
  }

  getDriver(driverID: number) {
    return this.arrivals.find( arrival => arrival.driver.id === driverID);
  }

  getMinutes(id: number): number {
    const arrival = this.arrivals.find(arrival => arrival.driver.id === id);
    if (arrival == null) {
      return null;
    } else {
      return Math.trunc((arrival.arrivalTime.valueOf() - this.now) / 1000);
    }
  }
}
