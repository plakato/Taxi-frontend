import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatButton } from '@angular/material';
import { CarRetrievalService } from '../../car/shared/car-retrieval.service';
import { Car } from '../../car/car.module';

@Component({
  selector: 'app-delete-car-dialog',
  templateUrl: './delete-car-dialog.component.html',
  styleUrls: ['./delete-car-dialog.component.scss'],
})
export class DeleteCarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarRetrievalService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.carService.delete(this.data.car.id);
    this.dialogRef.close();
  }

}
