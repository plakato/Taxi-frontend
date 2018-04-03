import { Component, OnInit } from '@angular/core';
import { Car } from '../car.module';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-choose-car',
  templateUrl: './choose-car.component.html',
  styleUrls: ['./choose-car.component.scss']
})
export class ChooseCarComponent implements OnInit {
  cars: Car[];

  constructor( private carService: CarService ) { }

  ngOnInit() {
    this.carService.getFreeAvailableCars().subscribe(
      cars => this.cars = cars
    );
  }

}
