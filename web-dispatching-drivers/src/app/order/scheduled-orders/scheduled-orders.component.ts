import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Order } from '../order.module';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-scheduled-orders',
  templateUrl: './scheduled-orders.component.html',
  styleUrls: ['./scheduled-orders.component.scss']
})
export class ScheduledOrdersComponent implements OnInit {

  displayedColumns = ['driver', 'car', 'start', 'finish', 'pickUpTime', 'note'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.listScheduledOrders(1, 10).subscribe(
      data => { this.dataSource = new MatTableDataSource(data);
          /**
           * Set the paginator and sort after the view init since this component will
           * be able to query its view for the initialized paginator and sort.
           */
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort; },
      err =>  this.dataSource = new MatTableDataSource([])
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
