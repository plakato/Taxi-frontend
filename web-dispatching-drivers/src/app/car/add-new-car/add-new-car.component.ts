import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CarRetrievalService } from '../shared/car-retrieval.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsComponent } from '../cars/cars.component';
import { MatSnackBar } from '@angular/material';
import { Car } from '../car.module';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {

  constructor(
    private carService: CarRetrievalService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  addCar(car: Car) {
      this.carService.add(car);
  }
}
