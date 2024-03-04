import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModalComponent} from "./auth-modal/auth-modal.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {FirestoreModule} from "@angular/fire/firestore";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModalComponent,
    RegisterComponent,
    LoginComponent,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  exports: [AuthModalComponent]
})
export class UserModule { }
