import {importProvidersFrom, Injectable, NgModule} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FormGroup} from "@angular/forms";
import {AuthModule, getAuth, provideAuth} from "@angular/fire/auth";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";


@Injectable({
  // the provider of the service must be any as this project is a standalone project so the root dosent has the provider needed
  // for the service as the provider is in the app.config.ts for the entire project
  providedIn: "any"
})
export class AuthService {

  constructor(private Auth: AngularFireAuth, private db : AngularFirestore) { }

  //
  async Register(registerForm : FormGroup) {
    try {
      //creating an object of the values needed to be stored in the database
      let User = {
        name : registerForm.controls["name"].value,
        email : registerForm.controls["email"].value,
        age : registerForm.controls["age"].value,
        phone : registerForm.controls["phone_number"].value
      }
      //add the user to the database
      await this.db.collection("Users").add(User);
      // here i used the registration.value instead of the registrationForm.get().value or the registrationForm.controls["name"].value
      let userCredential =  await this.Auth.createUserWithEmailAndPassword(registerForm.value.email , registerForm.value.password)
      let response = {
        isSucces : true,
        user : userCredential,
        message : null
      }
      return  response
    }
    catch (e) {
       let response = {
         isSucces : false,
          user : null,
         message : e as string
       }

      return response
    }

  }

}
