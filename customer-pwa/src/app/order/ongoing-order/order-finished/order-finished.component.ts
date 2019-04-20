import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-finished',
  templateUrl: './order-finished.component.html',
  styleUrls: ['./order-finished.component.scss']
})
export class OrderFinishedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newOrder() {
    this.router.navigate(['new-order']);
  }

}
