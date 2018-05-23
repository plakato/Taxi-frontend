import { Component, OnInit } from '@angular/core';
import { YesCancelDialogComponent } from '../../../reusable/yes-cancel-dialog/yes-cancel-dialog.component';
import { OrderService } from '../../order.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../../general/error/error.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-order-confirmed-by-driver',
  templateUrl: './order-confirmed-by-driver.component.html',
  styleUrls: ['./order-confirmed-by-driver.component.scss']
})
export class OrderConfirmedByDriverComponent implements OnInit {

  
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
