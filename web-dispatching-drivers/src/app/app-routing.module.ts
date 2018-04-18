import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { PasswordConfirmationComponent } from './user/password-confirmation/password-confirmation.component';
import { DispatchingMenuComponent } from './menu/dispatching-menu/dispatching-menu.component';
import { NewOrderComponent } from './order/dispatching/new-order/new-order.component';
import { CarsComponent } from './car/cars/cars.component';
import { ProfileDispatcherComponent } from './user/profile-dispatcher/profile-dispatcher.component';
import { EditCarComponent } from './car/edit-car/edit-car.component';
import { EmployeesComponent } from './user/employees/employees.component';
import { EditEmployeeComponent } from './user/edit-employee/edit-employee.component';
import { AuthGuardService, AdminGuardService } from './general/auth-guard.service';
import { ChooseCarComponent } from './car/choose-car/choose-car.component';
import { OrderHistoryComponent } from './order/dispatching/order-history/order-history.component';
import { ScheduledOrdersComponent } from './order/dispatching/scheduled-orders/scheduled-orders.component';
import { DriverMenuComponent } from './menu/driver-menu/driver-menu.component';
import { DriverNewOrderComponent } from './order/drivers/driver-new-order/driver-new-order.component';
import { OngoingOrdersComponent } from './order/dispatching/ongoing-orders/ongoing-orders.component';
import { DriverArrivingComponent } from './order/drivers/driver-arriving/driver-arriving.component';

const appRoutes: Routes = [
    { path: 'password-confirmation/:confirmation_token', component: PasswordConfirmationComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dispatching', component: DispatchingMenuComponent, canActivate: [AuthGuardService],
            children: [
              { path: 'orders',
                children: [
                  { path: 'new', component: NewOrderComponent },
                  { path: 'history', component: OrderHistoryComponent },
                  { path: 'scheduled', component: ScheduledOrdersComponent },
                  { path: 'ongoing', component: OngoingOrdersComponent }
                ]},
              { path: 'profile', component: ProfileDispatcherComponent},
              { path: 'employees', canActivate: [AdminGuardService],
                children: [
                  { path: '', component: EmployeesComponent },
                  { path: 'edit/:employeeID', component: EditEmployeeComponent }
                ]},
              { path: 'cars', canActivate: [AdminGuardService],
                children: [
                  { path: '', component: CarsComponent},
                  { path: 'edit/:carID', component: EditCarComponent}
                ]}
            ]},
    { path: 'drivers', canActivate: [AuthGuardService],
            children: [
              { path: '', component: DriverMenuComponent },
              { path: 'choose-car', component: ChooseCarComponent},
              { path: 'new-order', component: DriverNewOrderComponent },
              { path: 'arriving', component: DriverArrivingComponent}
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
