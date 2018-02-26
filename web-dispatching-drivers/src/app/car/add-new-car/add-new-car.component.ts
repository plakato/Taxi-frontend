import { Component, OnInit } from '@angular/core';
import { CarRetrievalService } from '../shared/car-retrieval.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {
  newCarForm: FormGroup;

  constructor(
    private carService: CarRetrievalService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.newCarForm = this.fb.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      plate: ['', [Validators.required, Validators.pattern('[0-9A-Z- :]*')]],
      max_persons: [4, [Validators.required, Validators.min(1)]],
      available: [true]
    });

  }

  addCar() {
    if (this.newCarForm.valid) {
      this.carService.add(this.newCarForm)
        .subscribe(
          data => {
          },
          err => {
            console.log(err.error);
          });
    this.newCarForm.reset();
    }
  }
}
