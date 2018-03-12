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

  constructor(
    private carService: CarRetrievalService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar ) { }

  ngOnInit() {
  }


  // Gets edited car from child.
  saveChanges(car: Car) {
    this.carService.update(car).subscribe(
      data => {
        this.snackbar.open('Změny byly úspěšně zaznamenány.', '', {duration: 2000});
        this.router.navigate(['../..'], { relativeTo: this.route });
      },
      err => this.snackbar.open('Vyskytla se chyba, změny nebyli uloženy.', '', {duration: 2000})
    );
  }
}
