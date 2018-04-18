import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DispatchingMenuComponent } from './dispatching-menu/dispatching-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { DriverMenuComponent } from './driver-menu/driver-menu.component';
import { OrderModule } from '../order/order.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    RouterModule,
    OrderModule
  ],
  exports: [
  ],
  declarations: [DispatchingMenuComponent, DriverMenuComponent]
})
export class MenuModule {}
