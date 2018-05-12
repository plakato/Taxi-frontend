import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { ErrorService } from './general/error/error.service';
import { httpInterceptorProviders } from './general/interceptor';
import { AuthGuardService } from './general/auth-guard.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthenticationModule } from './authentication/authentication.module';
import { OrderModule } from './order/order.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatNativeDateModule } from '@angular/material';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AuthenticationModule,
    OrderModule,
    HttpClientModule,
    MatSnackBarModule,
    MapModule,
    MatNativeDateModule
  ],
  providers: [
    ErrorService,
    { provide: LOCALE_ID, useValue: 'cs' },
    httpInterceptorProviders,
    AuthGuardService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
