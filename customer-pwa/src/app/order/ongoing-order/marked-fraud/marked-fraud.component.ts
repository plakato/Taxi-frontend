import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../../../assets/const';

@Component({
  selector: 'app-marked-fraud',
  templateUrl: './marked-fraud.component.html',
  styleUrls: ['./marked-fraud.component.scss']
})
export class MarkedFraudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  newOrder() {
    this.router.navigate(['new-order']);
  }

  getPhone(): string {
    return Constants.DISPATCHING_PHONE;
  }
}
