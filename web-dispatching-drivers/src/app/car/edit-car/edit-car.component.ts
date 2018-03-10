import { Component, OnInit } from '@angular/core';
import { CarRetrievalService } from '../shared/car-retrieval.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Car } from '../car.module';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  carID: number;
  carForm: FormGroup;
  image: string|any = null;

  constructor(
    private carService: CarRetrievalService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar ) { }

  ngOnInit() {
    // Initialize form.
    this.carForm = this.fb.group({
      name: [''],
      number: [''],
      plate: [''],
      max_persons: [4],
      available: [true]
    });
    // Fill in car information.
    this.carID = +this.route.snapshot.paramMap.get('id');
    this.carService.show(this.carID).subscribe(
      car => this.fillForm(car)
    );
  }

  newImageUploaded(image: string|any) {
    this.image = image;
  }

  fillForm(car: Car) {
    // Set original values from car.
    this.carForm.setValue({
      name:        car.name,
      number:      car.number,
      plate:       car.plate,
      max_persons: car.max_persons,
      available:   car.available
    });
    this.image = car.image;
  }

  saveChanges() {
    if (this.carForm.invalid) {
      this.snackbar.open('Vyplňte správne všechny položky!', 'OK', {duration: 2000});
      return;
    }
    const updatedCar: Car = this.carForm.value;
    updatedCar.id = this.carID;
    updatedCar.image = this.image;
    this.carService.update(updatedCar).subscribe(
      data => {
        this.snackbar.open('Změny byly úspěšně zaznamenány.', '', {duration: 2000});
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      err => this.snackbar.open('Vyskytla se chyba, změny nebyli uloženy.', '', {duration: 2000})
    );
  }
}
