import { Component, OnInit } from '@angular/core';
import { CarRetrievalService } from '../shared/car-retrieval.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsComponent } from '../cars/cars.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {
  newCarForm: FormGroup;

  constructor(
    private carService: CarRetrievalService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.newCarForm = this.fb.group({
      name: ['favorit', [Validators.required]],
      number: ['2', [Validators.required]],
      plate: ['AA', [Validators.required, Validators.pattern('[0-9A-Z- :]*')]],
      max_persons: [4, [Validators.required, Validators.min(1)]],
      available: [true]
    });

  }

  addCar() {
    if (this.newCarForm.valid) {
      this.carService.add(this.newCarForm.value);
      this.newCarForm.reset(); // is there a better way - reset to default?
    } else {
      this.snackbar.open('Vyplňte správně všechny položky!', 'OK', {duration: 2000});
    }
  }
}
