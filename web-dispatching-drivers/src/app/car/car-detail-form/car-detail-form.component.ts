import { Component, Input, AfterViewChecked, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Car } from '../car.module';
import { ImageUploadComponent } from '../../reusable/image/image-upload/image-upload.component';
import { ActivatedRoute } from '@angular/router';
import { CarRetrievalService } from '../shared/car-retrieval.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-car-detail-form',
  templateUrl: './car-detail-form.component.html',
  styleUrls: ['./car-detail-form.component.scss']
})
export class CarDetailFormComponent implements OnInit {
  car: Car;
  @Output() editedCarSubmit = new EventEmitter<Car>();
  originalImage: string|any;
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarRetrievalService,
    private snackbar: MatSnackBar ) { }

  ngOnInit() {
    // Initialize form.
    this.carForm = this.fb.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      plate: ['', [Validators.required, Validators.pattern('[0-9A-Z- :]*')]],
      max_persons: [4, [Validators.required, Validators.min(1)]],
      available: [true]
    });
    this.car = this.carForm.value;

    // Fill in car information.
    const This = this;
    const carID = this.route.snapshot.paramMap.get('carID');
    if (carID != null) {
      this.carService.get(Number(carID)).subscribe(
        car => { This.car = car;
                 This.originalImage = this.car.image; }
      );
    }
  }

   newImageUploaded(image: string|any) {
      this.car.image = image;
   }

  submit() {
    if (this.carForm.valid && this.car.image != null) {
      this.editedCarSubmit.emit(this.car);
      this.carForm.reset();
      // Clear image as a part of form.reset().
      this.originalImage = null;
    } else {
      this.snackbar.open('Vyplňte správně všechny položky!', 'OK', {duration: 2000});
    }
  }
}
