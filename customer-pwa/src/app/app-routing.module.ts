import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { NewOrderComponent } from './order/new-order/new-order.component';
import { AuthGuardService } from './general/auth-guard.service';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { PasswordRecoveryComponent } from './authentication/password-recovery/password-recovery.component';
import { NewPasswordComponent } from './authentication/new-password/new-password.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';

const appRoutes: Routes = [
  { path: 'new-order', component: NewOrderComponent, canActivate: [AuthGuardService] },
  { path: 'new-password/:phone', component: NewPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'standard-order', canActivate: [AuthGuardService],
      children: [
        { path: 'choose-start', component: CreateOrderComponent },
        { path: 'choose-finish', component: CreateOrderComponent },
        { path: 'fill-in-info', component: CreateOrderComponent }
        
      ]},
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
