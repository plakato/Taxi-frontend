import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorService {

  constructor(private snackbar: MatSnackBar) { }

  logToServer(error) {
    // Here can be later added logging to server.
  }

  // This is not recommended to use from ErrorHandler, because it doesn't trigger
  // change event which causes snackbar not to open properly.
  notifyUser(error) {
    // Handle network errors, they have different structure.
    if (error instanceof HttpErrorResponse) {debugger;
      if (error.error instanceof ErrorEvent) {
         // A client-side or network error occurred.
      this.snackbar.open(error.error.error, 'OK', { duration: 2000});
      } else if (error.error instanceof ProgressEvent) {
        this.snackbar.open('Error', 'OK', {duration: 2000});
      } else {
        // Show user what errors is server giving us.
         error.error.errors.forEach(pair => {
          this.snackbar.open(Object.values(pair)[0].toString(), 'OK', {duration: 2000});
      });
    }
    // Different error occured, let user know.
  } else {debugger;
      const message = error.message ? error.message : error.toString();
      this.snackbar.open(message, 'OK', { duration: 2000});
    }
  }

  showMessageToUser(message: string) {
    this.snackbar.open(message, '', {duration: 2000});
  }

}
