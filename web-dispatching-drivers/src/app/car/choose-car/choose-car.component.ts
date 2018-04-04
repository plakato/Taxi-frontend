import { Component, OnInit } from '@angular/core';
import { Car } from '../car.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ShiftService } from '../../order/shared/shift.service';
import { CarService } from '../shared/car.service';

@Component({
  selector: 'app-choose-car',
  templateUrl: './choose-car.component.html',
  styleUrls: ['./choose-car.component.scss']
})
export class ChooseCarComponent implements OnInit {
  cars: Car[];

  constructor( private shiftService: ShiftService,
              private carService: CarService,
              private router: Router,
              private snackbar: MatSnackBar ) { }

  ngOnInit() {
    this.carService.getFreeAvailableCars().subscribe(
      cars => this.cars = cars
    );
  }

  selectCar(car: Car) {
    this.shiftService.startShiftWithCar(car.id).subscribe(
      success => this.router.navigate(['drivers']),
      fail => this.snackbar.open('Nezdařilo se zvolení auta.', '', {duration: 2000})
    );
  }
}
