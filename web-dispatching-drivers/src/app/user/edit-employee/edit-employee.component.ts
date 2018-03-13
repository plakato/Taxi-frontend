import { Component, OnInit } from '@angular/core';
import { User } from '../user.module';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employee: User;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  saveChanges(employee: User) {
    this.userService.update(employee).subscribe(
    res => {this.snackbar.open('Změny byly úspěšně zaznamenány.', '', {duration: 2000});
            this.router.navigate(['../..'], { relativeTo: this.route });
    },
    err => this.snackbar.open('Vyskytla se chyba, změny nebyli uloženy.', '', {duration: 2000})
    );
  }
}
