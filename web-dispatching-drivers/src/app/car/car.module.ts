import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule } from '@angular/material';
import { ImageModule } from '../reusable/image/image.module';
import { CarRetrievalService } from './shared/car-retrieval.service';
import { AddNewCarComponent } from './add-new-car/add-new-car.component';
import { DeleteCarDialogComponent } from '../reusable/modals/delete-car-dialog/delete-car-dialog.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { CarDetailFormComponent } from './car-detail-form/car-detail-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    ImageModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [CarsComponent, AddNewCarComponent, EditCarComponent, CarDetailFormComponent],
  entryComponents: [DeleteCarDialogComponent],
  providers: [CarRetrievalService]
})
export class CarModule { }


export interface Car {
  image: string|any;
  id: number;
  name: string;
  number: number;
  plate: string;
  max_persons: number;
  available: boolean;
}
