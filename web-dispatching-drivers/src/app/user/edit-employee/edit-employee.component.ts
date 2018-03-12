import { Component, OnInit } from '@angular/core';
import { User } from '../user.module';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private userService: UserService ) { }

  ngOnInit() {
  }

  saveChanges(employee: User) {
    this.userService.update(employee);
  }
}
