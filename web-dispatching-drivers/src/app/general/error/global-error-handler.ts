import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector) { }

  handleError(error) {
    const errorService = this.injector.get(ErrorService);
    errorService.logToServer(error);
    console.log(error);

    throw error;
  }

}
