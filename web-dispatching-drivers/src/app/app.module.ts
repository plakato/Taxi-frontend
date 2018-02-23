import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { CarModule } from './car/car.module';
import { DomainInterceptor, JSONHeaderInterceptor } from './user/shared/domain.interceptor';

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
    CarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DomainInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JSONHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
