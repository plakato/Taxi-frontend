import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { PasswordConfirmationComponent } from './user/password-confirmation/password-confirmation.component';

const appRoutes: Routes = [
    { path: 'password-confirmation/:confirmation_token', component: PasswordConfirmationComponent},
    { path: 'login', component: LoginComponent },
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
