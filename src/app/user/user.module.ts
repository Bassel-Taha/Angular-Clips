import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModalComponent} from "./auth-modal/auth-modal.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule , AuthModalComponent, RegisterComponent, LoginComponent
  ],
  exports: [AuthModalComponent]
})
export class UserModule { }
