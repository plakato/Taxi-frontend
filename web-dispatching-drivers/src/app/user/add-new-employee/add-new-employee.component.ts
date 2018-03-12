import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../user.module';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.scss']
})
export class AddNewEmployeeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  addEmployee(employee: User) {
    this.userService.add(employee);
  }
}
