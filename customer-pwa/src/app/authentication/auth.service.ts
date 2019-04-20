import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './authentication.module';
import { tap } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(phone: string, name: string, password: string) {
    return this.http.post('customers', JSON.stringify(
      {
        customer: {
          name: name,
          telephone: phone,
          password: password
        }
      }
    ));
  }

  login(phone: string, password: string) {
    return this.http.post<Customer>('customers/login', JSON.stringify(
      {
        telephone: phone,
        password: password
      }
    )).pipe(tap(
      cust => {
        localStorage.setItem('currentUser', JSON.stringify({ token: cust.token, id: cust.id, phone: cust.telephone }));
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
    return this.http.patch('customers/confirm', JSON.stringify(
      {
        telephone: phone,
        confirmation_code: code
      }
    ));
  }

  resendConfirmationCode(phone: string) {
    return this.http.post('customers/resend_confirmation', JSON.stringify(
      {
        telephone: phone
      }
    ));
  }

  forgotPassword(phone: string) {
    return this.http.post('customers/password_recovery', JSON.stringify(
      {
        telephone: phone
      }
    ));
  }

  setNewPasswordFromRecovery(phone: string, password: string, code: string) {
    return this.http.patch('customers/reset_password_by_token', JSON.stringify(
      {
        telephone: phone,
        reset_password_token: code,
        password: password
      }
    ));
  }

    /** Custom validation function to determine that password and password confirmation are identical */
    areEqual(group: AbstractControl)  {
      const password = group.get('password');
      const passwordConfirmation = group.get('passwordConfirmation');
      if (password != null &&
          passwordConfirmation != null &&
          password.value !== passwordConfirmation.value) {
            return  { 'passwordMismatch': {value: true}} ;
      }
      return null;
    }
}
