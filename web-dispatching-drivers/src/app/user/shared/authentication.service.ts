import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent, User } from '../login/login.component';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<User>('employees/login', JSON.stringify({ email: email, password: password }));
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
    }

    confirm(password: string, token: string) {
        return this.http.post<User>('employees/confirm', JSON.stringify({confirmation_token : token, password: password }));
    }
}
