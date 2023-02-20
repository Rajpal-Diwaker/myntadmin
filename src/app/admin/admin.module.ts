import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'app/_shared/shared.module';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule

  ]
})
export class AdminModule { }
