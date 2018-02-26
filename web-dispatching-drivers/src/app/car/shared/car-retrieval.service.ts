import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../car.module';
@Injectable()
export class CarRetrievalService {

  constructor( private http: HttpClient) { }

  list() {
    return this.http.get<Car[]>('vehicles');
  }

  add(car) {
    return this.http.post<Car>('vehicles', JSON.stringify(
      { vehicle: {
          name: car.name,
          number: car.number,
          plate: car.plate,
          image: null, // add image
          max_persons: car.max_persons,
          available: car.available
    }}));
  }
}
