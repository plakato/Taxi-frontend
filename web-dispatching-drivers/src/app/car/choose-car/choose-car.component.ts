import { Component, OnInit } from '@angular/core';
import { Car } from '../car.module';
import { CarService } from '../shared/car.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-choose-car',
  templateUrl: './choose-car.component.html',
  styleUrls: ['./choose-car.component.scss']
})
export class ChooseCarComponent implements OnInit {
  cars: Car[];

  constructor( private carService: CarService,
              private router: Router,
              private snackbar: MatSnackBar ) { }

  ngOnInit() {
    this.carService.getFreeAvailableCars().subscribe(
      cars => this.cars = cars
    );
  }

  selectCar(car: Car) {
    this.carService.startShiftWithCar(car.id).subscribe(
      success => this.router.navigate(['']),
      fail => this.snackbar.open('Nezdařilo se zvolení auta.', '', {duration: 2000})
    );
  }
}
