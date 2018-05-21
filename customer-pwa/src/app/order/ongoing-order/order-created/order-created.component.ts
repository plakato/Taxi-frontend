import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-created',
  templateUrl: './order-created.component.html',
  styleUrls: ['./order-created.component.scss']
})
export class OrderCreatedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newOrder() {
    this.router.navigate(['new-order']);
  }

}
