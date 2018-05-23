import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { NewOrderComponent } from './order/new-order/new-order.component';
import { AuthGuardService } from './general/auth-guard.service';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { PasswordRecoveryComponent } from './authentication/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './authentication/new-password/new-password.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { CreateAirportOrderComponent } from './order/create-airport-order/create-airport-order.component';
import { ChangeDriverComponent } from './order/change-driver/change-driver.component';
import { OrderCreatedComponent } from './order/ongoing-order/order-created/order-created.component';
import { WaitForConfirmationComponent } from './order/ongoing-order/wait-for-confirmation/wait-for-confirmation.component';
import { CanceledOrderComponent } from './order/ongoing-order/canceled-order/canceled-order.component';
import { OrderFinishedComponent } from './order/ongoing-order/order-finished/order-finished.component';
import { WatchDriverArriveComponent } from './order/ongoing-order/watch-driver-arrive/watch-driver-arrive.component';
import { MarkedFraudComponent } from './order/ongoing-order/marked-fraud/marked-fraud.component';
import { OrderConfirmedByDriverComponent } from './order/ongoing-order/order-confirmed-by-driver/order-confirmed-by-driver.component';
import { ScheduledOrdersComponent } from './order/scheduled-orders/scheduled-orders.component';

const appRoutes: Routes = [
  { path: 'new-order', component: NewOrderComponent, canActivate: [AuthGuardService] },
  { path: 'new-password/:phone', component: NewPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'order', canActivate: [AuthGuardService],
      children: [
        { path: 'standard', 
            children: [
              { path: 'choose-start', component: CreateOrderComponent },
              { path: 'choose-finish', component: CreateOrderComponent },
              { path: 'fill-in-info', component: CreateOrderComponent },
              { path: 'change-driver', component: ChangeDriverComponent },
              { path: 'scheduled-order-created', component: OrderCreatedComponent },
              { path: 'wait-for-confirmation', component: WaitForConfirmationComponent}
             ]},
        { path: 'airport',
            children: [
              { path: 'choose-start', component: CreateAirportOrderComponent },
              { path: 'choose-finish', component: CreateAirportOrderComponent },
              { path: 'fill-in-info', component: CreateAirportOrderComponent },
              { path: 'created', component: OrderCreatedComponent }                     
            ]},
        { path: 'confirmed-by-driver', component: OrderConfirmedByDriverComponent },            
        { path: 'watch-driver-arrive', component: WatchDriverArriveComponent },
        { path: 'canceled', component: CanceledOrderComponent },
        { path: 'finished', component: OrderFinishedComponent },
        { path: 'fraud', component: MarkedFraudComponent }        
        ]},
  { path: 'orders/scheduled', component: ScheduledOrdersComponent },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- only debugging purposes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
