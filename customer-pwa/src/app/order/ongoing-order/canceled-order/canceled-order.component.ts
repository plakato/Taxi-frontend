import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canceled-order',
  templateUrl: './canceled-order.component.html',
  styleUrls: ['./canceled-order.component.scss']
})
export class CanceledOrderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newOrder() {
    this.router.navigate(['new-order']);
  }
}
