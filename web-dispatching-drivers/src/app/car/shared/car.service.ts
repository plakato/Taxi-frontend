import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../car.module';

@Injectable()
export class CarService {

  constructor( private http: HttpClient) { }

  getFreeAvailableCars() {
    return this.http.get<Car[]>('vehicles')
                    .map( cars => cars
                    .filter(c => c.available && c.driver_id === null));
  }

}
