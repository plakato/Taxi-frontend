import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTable, MatCell, MatHeaderCell, MatTableDataSource, MatSort } from '@angular/material';
import { CarRetrievalService } from '../shared/car-retrieval.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['number', 'name', 'plate', 'max_persons'/*, 'available'*/];
  listEmpty = false;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor( private carService: CarRetrievalService) { }

  ngOnInit() {
    this.carService.list()
    .subscribe(
      data => {
        if (data.length === 0) {
          this.listEmpty = true;
        } else {
          this.listEmpty = false;
        }
        this.dataSource.data = data;
      },
      err => {
        console.log(err.error);
      });
  }
}

