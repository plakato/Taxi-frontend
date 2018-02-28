import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatHeaderCell, MatTableDataSource, MatSort, MatCheckbox, MatCheckboxChange, MatDialog } from '@angular/material';
import { CarRetrievalService } from '../shared/car-retrieval.service';
import { Car } from '../car.module';
import { DeleteCarDialogComponent } from '../../modals/delete-car-dialog/delete-car-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['image', 'number', 'name', 'plate', 'max_persons', 'available', 'delete'];
  listEmpty = false;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private carService: CarRetrievalService,
    public dialog: MatDialog ) { }

  ngOnInit() {
    this.carService.cars.subscribe(
      res => {
        this.dataSource.data = res;
      }
    );
  }

  changeAvailable(car: Car, event: MatCheckboxChange) {
    car.available = event.checked;
    this.carService.update(car);
  }

  /** Open dialog to make sure user wanted to delete this car. */
  deleteCar(car: Car) {
    const deleteDialog = this.dialog.open(DeleteCarDialogComponent, {
      width: '300px',
      data: {car: car}});
    deleteDialog.afterClosed().subscribe(
      res => {
        console.log('The dialog was closed:' + res);
      });
  }
}



