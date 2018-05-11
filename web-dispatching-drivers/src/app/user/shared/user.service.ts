import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.module';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';


@Injectable()
export class UserService {
  private employeesEventSource: BehaviorSubject<Array<User>> = new BehaviorSubject(Array());
  public readonly employees: Observable<Array<User>> = this.employeesEventSource.asObservable();
  private employeesData: User[];
  private translated_roles = {'dispatcher': 'dispečer',
                              'driver': 'řidič',
                              'admin': 'admin'};

  constructor( private http: HttpClient) {
    this.loadInitialData();
   }

  loadInitialData() {
    this.http.get<User[]>('employees').subscribe(
      res => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (current.roles.indexOf('admin') > -1) {
          res.forEach(user => {
            user.employee_roles = user.employee_roles.map( x => this.translated_roles[x.role]);
          });
        }
        this.employeesData = res;
        this.employeesEventSource.next(this.employeesData);
      });
  }

  updateImage(userID: number, image: string) {
    return this.http.put<User>('employees/' + userID, JSON.stringify(
    { employee: {
      image: image
      // employee_role_attributes: user.employee_roles,
      // name: user.name
    }}));
}

  update(user: User) {
    return this.http.put<User>('employees/' + user.id, JSON.stringify({
      employee: {
        email: user.email,
        name: user.name,
        image: user.image,
        employee_role_attributes:  user.employee_roles.map(one => ({ role: one }))
      }
    })).map(
      employee => { employee.employee_roles = employee.employee_roles
                                        .map( x => this.translated_roles[x.role]);
                    const index = this.employeesData.findIndex( u => u.id === user.id);
                    this.employeesData[index] = employee;
                    this.employeesEventSource.next(this.employeesData);
      }
    );
  }

  getUser(userID: number) {
    return this.http.get<User>('employees/' + userID)
      .map(
        user => {user.employee_roles = user.employee_roles.map( x => x.role);
                 return user; });
  }

  add(user: User) {
    this.http.post<User>('employees', JSON.stringify({
      employee: {
        email: user.email,
        name: user.name,
        image: user.image,
        employee_role_attributes:  user.employee_roles.map(one => ({ role: one }))
      }
    })).subscribe(
      employee => { employee.employee_roles = employee.employee_roles
                                        .map( x => this.translated_roles[x.role]);
                this.employeesData.push(employee);
                this.employeesEventSource.next(this.employeesData);
      }
    );
  }

  delete(userID: number) {
    this.http.delete('employees/' + userID).subscribe(
      success => { const index = this.employeesData.findIndex( u => u.id === userID);
                   this.employeesData.splice(index);
                   this.employeesEventSource.next(this.employeesData);
                  }
      );
  }

}
