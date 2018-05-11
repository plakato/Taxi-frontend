import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule, MAT_DATE_LOCALE, ErrorStateMatcher } from '@angular/material';


import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { CarModule } from './car/car.module';
import { ModalsModule } from './reusable/modals/modals.module';
import { ImageModule } from './reusable/image/image.module';
import { DirtyErrorStateMatcher } from './reusable/error-state-matcher/error-state-matcher.module';

import { GlobalErrorHandler } from './general/error/global-error-handler';
import { ErrorService } from './general/error/error.service';
import { httpInterceptorProviders } from './general/interceptor/index';
import { AuthGuardService, AdminGuardService, LoggedOutGuardService } from './general/auth-guard.service';
import { MapModule } from './map/map.module';
import { DriverModule } from './driver/driver.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    MenuModule,
    OrderModule,
    CarModule,
    ModalsModule,
    ImageModule,
    MatSnackBarModule,
    MapModule,
    DirtyErrorStateMatcher,
    DriverModule
  ],
  providers: [
    ErrorService,
    { provide: ErrorHandler,      useClass: GlobalErrorHandler },
    {provide: MAT_DATE_LOCALE, useValue: 'cs'},
    httpInterceptorProviders,
    AuthGuardService,
    AdminGuardService,
    LoggedOutGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


