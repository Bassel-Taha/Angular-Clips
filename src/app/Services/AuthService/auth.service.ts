import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FormGroup} from "@angular/forms";
import {IUser} from "../../models/iuser";
import {map, Observable} from "rxjs";
import {log} from "node:util";


@Injectable({
  // the provider of the service must be any as this project is a standalone project so the root doesn't has the provider needed
  // for the service as the provider is in the app.config.ts for the entire project
  providedIn: "any"
})
export class AuthService {

  usercollection : AngularFirestoreCollection<IUser>

  //observable to know if the user is signed in or not
  isUserLogedIn$ : Observable<boolean> = this.Auth.user.pipe(
    map(user => {
      this.status = !!user
      return !!user
    })
  )
  // prop te get the toaster hidden after clicking on the X button
  status? : boolean

  constructor(private Auth: AngularFireAuth, private db : AngularFirestore) {
    this.usercollection = db.collection<IUser>("Users");
  }

  // the registration method
  async Register(registerForm : FormGroup) {
    try {
      //creating an object of the values needed to be stored in the database
      let User : IUser = {
        name : registerForm.controls["name"].value,
        email : registerForm.controls["email"].value,
        age : registerForm.controls["age"].value,
        phone : registerForm.controls["phone_number"].value
      }
      // here I used the registration.value instead of the registrationForm.get().value or the registrationForm.controls["name"].value
      let userCredential =  await this.Auth.createUserWithEmailAndPassword(registerForm.value.email , registerForm.value.password)

      //add the user to the database
      //the doc funnction will create a new document with the user id as the name of the document "creating a folder to host the data by the id of the user"
      //the set function will set the data of the user in the document as the add function cant work with the doc function
      await this.usercollection.doc(userCredential.user?.uid).set(User);
      //adding an observable to push the boolean value of the login status from the firebase servers depending on the token and all that is handled by the firebase server


      //update the user profile with the name of the user so that the displayed name will be the name of the user
      await userCredential.user?.updateProfile({displayName : User.name})
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

  //the login method
  async Login(loginForm : FormGroup) {
    try {
      let userCredential = await this.Auth.signInWithEmailAndPassword(loginForm.value.email , loginForm.value.password)
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
