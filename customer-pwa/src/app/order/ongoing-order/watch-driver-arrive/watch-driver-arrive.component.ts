import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { MatDialog } from '@angular/material';
import { YesCancelDialogComponent } from '../../../reusable/yes-cancel-dialog/yes-cancel-dialog.component';
import { Router } from '@angular/router';
import { ErrorService } from '../../../general/error/error.service';

@Component({
  selector: 'app-watch-driver-arrive',
  templateUrl: './watch-driver-arrive.component.html',
  styleUrls: ['./watch-driver-arrive.component.scss']
})
export class WatchDriverArriveComponent implements OnInit {

  constructor(private orderService: OrderService,
              private dialog: MatDialog,
              private router: Router,
              private errorService: ErrorService) { }

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
