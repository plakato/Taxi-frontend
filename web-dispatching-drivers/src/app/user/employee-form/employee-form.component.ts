import { Component, OnInit, Input, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../user.module';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  roles: FormGroup;
  employee: User;
  @Output() employeeSubmitted = new EventEmitter<User>();
  image: string|any;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar ) { }

  ngOnInit() {
    this.roles = this.fb.group({
      dispatcher: [false], // TODO validate - at least one check checked
      driver: [false],
      admin: [false]
    });
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      roles: this.roles
    });
    this.employee = this.employeeForm.value;
    this.employee.employee_roles = new Array<string>();
  }

  submit() {
    if (this.employeeForm.valid) {
      // Set roles from checked checkboxes.
      Object.entries(this.roles.value).forEach(role => {
        if (role[1] === true) {
          this.employee.employee_roles.push(role[0]);
        }
      });
      this.employeeSubmitted.emit(this.employee);
      this.employeeForm.reset();
      this.image = null;
    } else  {
      this.snackbar.open('Vyplňte správně všechny položky!', 'OK', {duration: 2000});
    }
  }

  newImageUploaded(image: string|any) {
    this.employee.image = image;
  }
}
