import { Component, OnInit } from '@angular/core';
import {
  MatIcon,
  MatSidenav,
  MatSidenavContainer,
  MatListItem,
  MatToolbar } from '@angular/material';
import { AuthenticationService } from '../../user/shared/authentication.service';
import { User } from '../../user/user.module';

@Component({
  selector: 'app-dispatching-menu',
  templateUrl: './dispatching-menu.component.html',
  styleUrls: ['./dispatching-menu.component.scss']
})
export class DispatchingMenuComponent implements OnInit {
  isExpanded = false;
  isAdmin: boolean;

  constructor( private authService: AuthenticationService ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.isAdmin = (user.roles.indexOf('admin') > -1);
  }

  logout() {
    this.authService.logout();
  }

}
