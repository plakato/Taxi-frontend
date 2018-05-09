import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginatorIntl, MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../order.module';
import { OrderService } from '../../shared/order.service';
import { OrdersPollingService, OrderRequestParams } from '../../shared/data-source/orders-polling.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CzechPaginatorIntl } from '../../shared/data-source/czech-paginator-intl.service';
import { OrderDataSource } from '../orders-table/orders-table.component';
import { CancelOrderDialogComponent } from '../../../reusable/modals/cancel-order-dialog/cancel-order-dialog.component';
import { ErrorService } from '../../../general/error/error.service';
import { ListAllDriversComponent } from '../../../driver/list-all-drivers/list-all-drivers.component';

@Component({
  selector: 'app-scheduled-orders',
  templateUrl: './scheduled-orders.component.html',
  styleUrls: ['./scheduled-orders.component.scss']
})
export class ScheduledOrdersComponent implements AfterViewInit {

  displayedColumns = ['driver', 'car', 'start', 'finish', 'pickUpDate', 'pickUpTime', 'note', 'action'];
  ordersEventSource: BehaviorSubject<Array<Order>> = new BehaviorSubject(Array());
  orderData: Order[] = new Array();
  dataSource = new OrderDataSource(this.ordersEventSource);
  totalOrdersCount: BehaviorSubject<number> = new BehaviorSubject(0);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersPollingService: OrdersPollingService,
              private orderService: OrderService,
              private errorService: ErrorService,
              private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    this.paginator._intl = new CzechPaginatorIntl();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
                      pageSize: this.dataSource.paginator.pageSize, length: null});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onPageChange(event: PageEvent) {
    const params: OrderRequestParams = new OrderRequestParams(event.pageIndex, event.pageSize);
    params.scheduled = true;
    params.waiting = true;
    const This = this;
    this.ordersPollingService.loadPage(params).subscribe(
      res => {
        let iterator = 0;
        this.totalOrdersCount.next(res.totalCount);
        res.item.subscribe(
          order => {
            This.orderData.splice((params.page - 1) * params.per_page + iterator++, 1, order);
            this.ordersEventSource.next(This.orderData);
        });
      }
    );
  }

  cancelOrder(order: Order) {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent, {
      width: '250px',
      data: { id: order.id }
    });
    const This = this;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
      This.orderService.cancel(order.id).subscribe(
        success => {
          This.onPageChange({pageIndex: this.dataSource.paginator.pageIndex,
            pageSize: this.dataSource.paginator.pageSize, length: null});
        },
        err => This.errorService.showMessageToUser('Zrušení objednávky se nepovedlo :(')
      ); }
    });
  }

  changeDriver(order: Order, newDriverID: number, control: ListAllDriversComponent) {debugger;
    this.orderService.updateDriver(order.id, newDriverID)/*.subscribe(
      success => {},
      err => {
        control.selectDriver(order.driver);
        this.errorService.showMessageToUser('Změna řidiče se nezdařila.'); }
    )*/;
  }
}