import { Component, OnInit } from '@angular/core';
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
  newCarForm: FormGroup;
  imageEncoded: string|any = null;
  noImageChosen = true;

  constructor(
    private carService: CarRetrievalService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.newCarForm = this.fb.group({
      name: ['Chevrolet', [Validators.required]],
      number: ['5', [Validators.required]],
      plate: ['AAA11', [Validators.required, Validators.pattern('[0-9A-Z- :]*')]],
      max_persons: [4, [Validators.required, Validators.min(1)]],
      available: [true]
    });

  }

  addCar() {
    if (this.newCarForm.valid) {
      const car = this.newCarForm.value;
      car.image = this.imageEncoded;
      this.carService.add(car);
      this.newCarForm.reset(); // is there a better way - reset to default?
    } else {
      this.snackbar.open('Vyplňte správně všechny položky!', 'OK', {duration: 2000});
    }
  }

  // event target has to be typed, otherwise property files cannot be accessed.
  onImageLoad(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      debugger;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageEncoded = 'data:' + file.type + '\;base64,' + reader.result.split(',')[1];
       /* this.newCarForm.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });*/
      };
    }
    if (this.imageEncoded !== null) {
      this.noImageChosen = false;
    }
  }
}
