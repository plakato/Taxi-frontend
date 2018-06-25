import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from '../user/shared/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    const current = localStorage.getItem('currentUser');

    if (current !== null) { return true; }

    // Navigate to the login page.
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}

/** Restricts access to areas of anonymous users for users who are logged in (like login screen). */
@Injectable()
export class LoggedOutGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLoggedOut(url);
  }

  checkLoggedOut(url: string): boolean {
    const current = JSON.parse(localStorage.getItem('currentUser'));
   if (current === null) {
     return true;
   }
  // Navigate to the home page.
 /* if (current.roles.indexOf('driver') > -1) {
    if (localStorage.getItem('car') != null) {
      this.router.navigate(['/drivers']);
    } else {
      this.router.navigate(['/drivers/choose-car']);
    }
  } else {
    this.router.navigate(['/dispatching/new-order']);
  }
*/
  return false;
  }

}

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    const current = JSON.parse(localStorage.getItem('currentUser'));
   if (current !== null && current.roles.indexOf('admin') > -1) {
     return true;
   }
  // Navigate to the login page.
  this.router.navigate(['/login']);
  return false;
  }

}
