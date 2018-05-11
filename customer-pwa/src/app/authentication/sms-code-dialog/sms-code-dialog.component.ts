import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sms-code-dialog',
  templateUrl: './sms-code-dialog.component.html',
  styleUrls: ['./sms-code-dialog.component.scss']
})
export class SmsCodeDialogComponent implements OnInit {
  code: string;

  constructor(public dialogRef: MatDialogRef<SmsCodeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  confirm() {
    const This = this;
    this.authService.confirm(this.code, this.data.phone).subscribe(
      success => {
        This.dialogRef.close('OK');
      }
    );
  }

  resend() {
    const This = this;
    this.authService.resendConfirmationCode(this.data.phone).subscribe(
      succes => This.snackbar.open('Byl Vám odeslán nový kód.', '' , { duration: 2000})
    );
  }

}
