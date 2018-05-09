import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './authentication.module';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(phone: string, password: string) {
    return this.http.post<Customer>('customers/login', JSON.stringify(
      {
        telephone: phone,
        password: password
      }
    )).pipe(tap(
      cust => {
        localStorage.setItem('currentUser', JSON.stringify({ token: cust.token }));
      }
    ));
  }

  logout() {
    return this.http.delete('customers/logout')
            .pipe(tap(
              success => localStorage.setItem('currentUser', null)
            ));
  }

  confirm(code: string, phone: string) {
    return this.http.patch('customers/confirmation', JSON.stringify(
      {
        telephone: phone,
        confirmation_code: code
      }
    ));
  }

  resendConfirmationCode(phone: string) {
    return this.http.put('customers/resend_confirmation', JSON.stringify(
      {
        telephone: phone
      }
    ));
  }

  forgotPassword(phone: string) {
    return this.http.put('customers/password_recovery', JSON.stringify(
      {
        telephone: phone
      }
    ));
  }

  setNewPasswordFromRecovery(phone: string, password: string, code: string) {
    this.http.patch('customers/reset_password_by_token', JSON.stringify(
      {
        telephone: phone,
        reset_password_token: code,
        password: password
      }
    ));
  }
}
