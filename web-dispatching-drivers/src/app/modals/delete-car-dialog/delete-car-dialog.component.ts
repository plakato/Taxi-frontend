import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatButton } from '@angular/material';

@Component({
  selector: 'app-delete-car-dialog',
  templateUrl: './delete-car-dialog.component.html',
  styleUrls: ['./delete-car-dialog.component.scss']
})
export class DeleteCarDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
