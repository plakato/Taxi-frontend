import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatToolbarModule } from '@angular/material';
import { DispatchingMenuComponent } from './dispatching-menu/dispatching-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
  ],
  declarations: [DispatchingMenuComponent]
})
export class MenuModule {}
