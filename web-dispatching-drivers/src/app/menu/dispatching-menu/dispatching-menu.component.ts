import { Component, OnInit } from '@angular/core';
import {
  MatIcon,
  MatSidenav,
  MatSidenavContainer,
  MatListItem,
  MatListDivider,
  MatToolbar } from '@angular/material';

@Component({
  selector: 'app-dispatching-menu',
  templateUrl: './dispatching-menu.component.html',
  styleUrls: ['./dispatching-menu.component.scss']
})
export class DispatchingMenuComponent implements OnInit {
  isExpanded = false;
  constructor() { }

  ngOnInit() {
  }

}
