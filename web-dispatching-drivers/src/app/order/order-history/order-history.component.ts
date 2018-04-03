import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Order } from '../order.module';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, AfterViewInit {
  intervalForm: FormGroup;
  displayedColumns: MatTableDataSource<Order>;
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filter for datepicker - only today or earlier can be selected.
  filterTodayOrEarlier = (d: Date): boolean => {
    // Set hours so that only days are compared, not time.
    return d.setHours(0, 0, 0, 0) <= (new Date(Date.now()).setHours(0, 0, 0, 0));
  }


  constructor(
    private fb: FormBuilder ) { }

  ngOnInit()  {
    const today = new Date(Date.now());
    this.intervalForm = this.fb.group({
      fromDate: [''],
      toDate: [today]
    });
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
