import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.module';

@Injectable()
export class UserService {

  constructor( private http: HttpClient ) { }

  updateImage(userID: string, image: string) {
    return this.http.put<User>('employees/' + userID, JSON.stringify(
    { employee: {
      image: image
      // employee_role_attributes: user.employee_roles,
      // name: user.name
    }}));
}

  getUser(userID: string) {
    return this.http.get<User>('employees/' + userID);
  }

}
