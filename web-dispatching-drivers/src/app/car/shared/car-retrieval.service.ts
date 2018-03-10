import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Car } from '../car.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CarRetrievalService {
  private carsEventSource: BehaviorSubject<Array<Car>> = new BehaviorSubject(Array());
  public readonly cars: Observable<Array<Car>> = this.carsEventSource.asObservable();
  private carsData: Car[];

  constructor( private http: HttpClient) {
    this.loadInitialData();
   }

  loadInitialData() {
    this.http.get<Car[]>('vehicles').subscribe(
      res => {
        this.carsData = res;
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
        this.carsData.push(res);
        this.carsEventSource.next(this.carsData);
      },
      err => {
        // TODO: errorz
      }
    );
  }

  show(carID: number) {
    return this.http.get<Car>('vehicles/' + carID);
  }

  update(car: Car) {
    return this.http.put('vehicles/' + car.id, JSON.stringify(
      { vehicle: {
          name: car.name,
          number: car.number,
          plate: car.plate,
          image: car.image,
          max_persons: car.max_persons,
          available: car.available
    }})).map(
      (response: Response) => {
        const index = this.carsData.findIndex(c => c.id === car.id);
        this.carsData[index] = car;
        this.carsEventSource.next(this.carsData);
      }
    ); // add mapping to reflect changes
  }

  delete(carID) {debugger;
    this.http.delete('vehicles/' + carID) .subscribe(
      res => {
        const index = this.carsData.findIndex(car => car.id === carID);
        this.carsData.splice(index);
        this.carsEventSource.next(this.carsData);
      },
      err => {
        // TODO
      });
  }
}
