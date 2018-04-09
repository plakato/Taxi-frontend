import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Car } from '../car.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CarRetrievalService {
  private carsEventSource: BehaviorSubject<Map<number, Car>> = new BehaviorSubject( new Map());
  // Extract values from the map to have it as an array of cars.
  public readonly cars: Observable<Array<Car>> = this.carsEventSource.asObservable().map( map => Array.from(map.values()));
  private carsData: Map<number, Car>;

  constructor( private http: HttpClient) {
    this.loadInitialData();
   }

  loadInitialData() {
    this.http.get<Car[]>('vehicles').subscribe(
      res => {
        this.carsData = res.reduce((cars: Map<number, Car>, car: Car)  => {
                                                    cars[car.id] = car;
                                                    return cars; }, new Map());
        this.carsEventSource.next(this.carsData);
      }
    );
  }

  add(car: Car) {
    this.http.post<Car>('vehicles', JSON.stringify(
      { vehicle: {
          name: car.name,
          number: car.number,
          plate: car.plate,
          image: car.image,
          max_persons: car.max_persons,
          available: car.available
    }})).subscribe(
      res => {
        this.carsData[res.id] = res;
        this.carsEventSource.next(this.carsData);
      },
      err => {
        // TODO: errorz
      }
    );
  }

  /** Gets updated car info. */
  get(carID: number) {
    return this.http.get<Car>('vehicles/' + carID);
  }

  /** Shows saved instance of car. */
  show(carID: number) {
    return this.cars[carID];
  }

  update(car: Car) {
    return this.http.put<Car>('vehicles/' + car.id, JSON.stringify(
      { vehicle: {
          name: car.name,
          number: car.number,
          plate: car.plate,
          image: car.image,
          max_persons: car.max_persons,
          available: car.available
    }})).map(
      (response: Car) => {
        this.carsData[response.id] = response;
        this.carsEventSource.next(this.carsData);
      }
    ); // add mapping to reflect changes
  }

  delete(carID) {
    this.http.delete('vehicles/' + carID) .subscribe(
      res => {
        this.carsData.delete(carID);
        this.carsEventSource.next(this.carsData);
      },
      err => {
        // TODO
      });
  }
}
