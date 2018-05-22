import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-yes-cancel-dialog',
  templateUrl: './yes-cancel-dialog.component.html',
  styleUrls: ['./yes-cancel-dialog.component.scss']
})
export class YesCancelDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<YesCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text: string}) { }

  ngOnInit() {
  }
}
