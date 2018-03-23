import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../user.module';
import { tap } from 'rxjs/operators';



@Injectable()
export class AuthenticationService {
    constructor(
      private http: HttpClient,
      private router: Router) { }

    login(email: string, password: string) {
        return this.http.post<User>('employees/login', JSON.stringify({ email: email, password: password }))
        .pipe(tap<User>(
          response => { response.employee_roles = response.employee_roles.map( x => x.role );
                        return response; }
        ));
            /*.map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                /*if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // change to login screen
        this.router.navigate(['login']);
    }

    confirm(password: string, token: string) {
        return this.http.patch<User>('employees/confirm', JSON.stringify({confirmation_token : token, password: password }));
    }

    updatePassword(id: number, newPassword: string) {
      return this.http.put('employees/' + id, JSON.stringify({ password: newPassword }));
    }
}
