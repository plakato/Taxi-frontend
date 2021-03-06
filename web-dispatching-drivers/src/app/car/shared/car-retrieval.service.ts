import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Car } from '../car.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorService } from '../../general/error/error.service';

@Injectable()
export class CarRetrievalService {
  private carsEventSource: BehaviorSubject<Map<number, Car>> = new BehaviorSubject( new Map());
  // Extract values from the map to have it as an array of cars.
  public readonly cars: Observable<Array<Car>> = this.carsEventSource.asObservable().map( map => Array.from(map.values()));
  private carsData: Map<number, Car> = new Map();

  constructor( private http: HttpClient,
              private errorService: ErrorService) {
    this.loadInitialData();
   }

  loadInitialData() {
    this.http.get<Car[]>('vehicles').subscribe(
      res => {
        res.forEach(car => { this.carsData.set(car.id, car); });
        this.carsEventSource.next(this.carsData);
      }
    );
  }

  add(car: Car) {
    const This = this;
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
        This.carsData.set(res.id, res);
        This.carsEventSource.next(this.carsData);
      },
      err => {
        This.errorService.showMessageToUser('Vytvoření auta se nezdařilo.');
      }
    );
  }

  /** Gets updated car info. */
  get(carID: number) {
    return this.http.get<Car>('vehicles/' + carID).map(
      car => {
        this.carsData.set(carID, car);
        this.carsEventSource.next(this.carsData);
        return car;
      }
    );
  }

  /** Shows saved instance of car. */
  show(carID: number) {
    if (this.carsData.get(carID) != null) {
      return of(this.carsData.get(carID));
    } else {
      return this.get(carID);
    }
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
        this.carsData.set(response.id, response);
        this.carsEventSource.next(this.carsData);
      }
    ); // add mapping to reflect changes
  }

  delete(carID) {
    const This = this;
    this.http.delete('vehicles/' + carID) .subscribe(
      res => {
        This.carsData.delete(carID);
        This.carsEventSource.next(this.carsData);
      },
      err => {
        This.errorService.showMessageToUser('Smazání auta se nezdařilo.');
      });
  }
}
