import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { PasswordConfirmationComponent } from './user/password-confirmation/password-confirmation.component';
import { DispatchingMenuComponent } from './menu/dispatching-menu/dispatching-menu.component';
import { NewOrderComponent } from './order/new-order/new-order.component';
const appRoutes: Routes = [
    { path: 'password-confirmation/:confirmation_token', component: PasswordConfirmationComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dispatching', component: DispatchingMenuComponent},
    { path: 'new_order', component: NewOrderComponent, outlet: 'dispatching-selected'},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
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
