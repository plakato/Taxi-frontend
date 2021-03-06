import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  loggedIn = JSON.parse(localStorage.getItem('currentUser')) !== null;

  constructor(private authService: AuthService,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit() {
  }

  chooseStandard() {
    this.router.navigate(['order/standard/choose-start']);
  }

  chooseAirport() {
    this.router.navigate(['order/airport/fill-in-info']);
  }

  logout() {
    const This = this;
    this.authService.logout().subscribe(
      success => This.router.navigate(['login']),
      fail => This.errorService.showMessageToUser('Odhlášení se nezdařilo.')
    );
  }
}
