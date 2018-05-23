import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../../general/error/error.service';
import { MatDialog } from '@angular/material';
import { YesCancelDialogComponent } from '../../../reusable/yes-cancel-dialog/yes-cancel-dialog.component';

@Component({
  selector: 'app-wait-for-confirmation',
  templateUrl: './wait-for-confirmation.component.html',
  styleUrls: ['./wait-for-confirmation.component.scss']
})
export class WaitForConfirmationComponent implements OnInit {

  constructor(private orderService: OrderService,
              private router: Router,
              private errorService: ErrorService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  cancelOrder() {
    let dialogRef = this.dialog.open(YesCancelDialogComponent, {
      width: '250px',
      data: { text: 'Skutečně chcete zrušit tuto objednávku?'}
    });
    const This = this;
    dialogRef.afterClosed().subscribe(cancel => {
      if (cancel) {
        This.orderService.cancelCurrentOrder().subscribe(
          success => this.router.navigate(['order/canceled']),
          fail => This.errorService.showMessageToUser('Objednávku se nezdařilo zrušit.'));
      }
    });
  }
}
