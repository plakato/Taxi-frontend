import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { PasswordConfirmationComponent } from './user/password-confirmation/password-confirmation.component';
import { DispatchingMenuComponent } from './menu/dispatching-menu/dispatching-menu.component';
import { NewOrderComponent } from './order/new-order/new-order.component';
import { CarsComponent } from './car/cars/cars.component';
import { ProfileDispatcherComponent } from './user/profile-dispatcher/profile-dispatcher.component';
import { EditCarComponent } from './car/edit-car/edit-car.component';
import { EmployeesComponent } from './user/employees/employees.component';

const appRoutes: Routes = [
    { path: 'password-confirmation/:confirmation_token', component: PasswordConfirmationComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dispatching', component: DispatchingMenuComponent,
            children: [
              { path: 'new_order', component: NewOrderComponent},
              { path: 'profile', component: ProfileDispatcherComponent},
              { path: 'employees', component: EmployeesComponent },
              { path: 'cars',
                children: [
                  { path: '', component: CarsComponent},
                  { path: 'edit/:carID', component: EditCarComponent}
                ]}
            ]},
   { path: '', redirectTo: 'login', pathMatch: 'full' },
    // otherwise redirect to home
  // { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        )
      ],
      exports: [
        RouterModule
      ]
    })
export class AppRoutingModule {}
