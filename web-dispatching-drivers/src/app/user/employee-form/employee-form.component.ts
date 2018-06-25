import { Component, OnInit, Input, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../user.module';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

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
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService ) { }

  ngOnInit() {
    // Initialize form with validators.
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

    // Get employee if given ID.
    const id = this.route.snapshot.paramMap.get('employeeID');
    if (id != null) {
      this.setEmployee(Number(id));
    }
  }

  setEmployee(id: number) {
    this.userService.getUser(Number(id)).subscribe(
      employee => {
        this.employee = employee;
        this.image = employee.image;
        Object.entries(this.roles.controls).forEach( control => {
          if (employee.employee_roles.indexOf(control[0]) !== -1) {
            control[1].setValue(true);
          } else {
            control[1].setValue(false);
          }
        });
        // Email is a login unique identification - can't be editted.
        this.employeeForm.get('email').disable();
      }
    );
  }

  submit() {
    if (this.employeeForm.valid) {
      this.employee.employee_roles = [];
      // Set roles from checked checkboxes.
      Object.entries(this.roles.value).forEach(role => {
        if (role[1] === true) {
          this.employee.employee_roles.push(role[0]);
        }
      });
      this.employeeSubmitted.emit(this.employee);
    } else  {
      this.snackbar.open('Vyplňte správně všechny položky!', 'OK', {duration: 2000});
    }
  }

  newImageUploaded(image: string|any) {
    this.employee.image = image;
  }
}
