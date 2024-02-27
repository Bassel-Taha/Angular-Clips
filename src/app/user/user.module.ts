import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModalComponent} from "./auth-modal/auth-modal.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule , AuthModalComponent
  ],
  exports: [AuthModalComponent]
})
export class UserModule { }
