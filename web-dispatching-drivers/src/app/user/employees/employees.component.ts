import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.module';
import { DeleteEmployeeDialogComponent } from '../../reusable/modals/delete-employee-dialog/delete-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['image', 'name', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar ) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userService.employees.subscribe(
      res => {
        this.dataSource.data = res;
      }
    );
  }

  /** Open dialog to make sure user wanted to delete this employee. */
  deleteEmployee(employee: User) {
    // Check if it's not the current user.
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.id === employee.id) {
      this.snackBar.open('Nemůžete smazat sám sebe!', '', {duration: 2000});
      return;
    }
    // Open dialog to make sure user wanted to delete this employee.
    const deleteDialog = this.dialog.open(DeleteEmployeeDialogComponent, {
      width: '300px',
      data: {employee: employee}});
    deleteDialog.afterClosed().subscribe(
      res => {
        console.log('The dialog was closed:' + res);
      });
  }

  editEmployee(employee: User) {
    this.router.navigate(['edit/' + employee.id], { relativeTo: this.route });
  }

}
