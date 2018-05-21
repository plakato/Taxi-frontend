import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../../general/error/error.service';

@Component({
  selector: 'app-wait-for-confirmation',
  templateUrl: './wait-for-confirmation.component.html',
  styleUrls: ['./wait-for-confirmation.component.scss']
})
export class WaitForConfirmationComponent implements OnInit {

  constructor(private orderService: OrderService,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit() {
  }

  cancelOrder() {
    const This = this;
    this.orderService.cancelCurrentOrder().subscribe(
      success => this.router.navigate(['order-canceled']),
      fail => This.errorService.showMessageToUser('Objednávku se nezdařilo zrušit.')
    )
  }
}
