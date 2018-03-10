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
  carForm: FormGroup;
  image: string|any = null;

  constructor(
    private carService: CarRetrievalService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.carForm = this.fb.group({
      name: [''],
      number: [''],
      plate: [''],
      max_persons: [4],
      available: [true]
    });
  }

  addCar() {
    if (this.carForm.valid) {
      const car = this.carForm.value;
      car.image = this.image;
      this.carService.add(car);
      this.carForm.reset(); // is there a better way - reset to default?
      this.image = null;
    } else {
      this.snackbar.open('Vyplňte správně všechny položky!', 'OK', {duration: 2000});
    }
  }


  newImageUploaded(image: string|any) {
    this.image = image;
  }
}
