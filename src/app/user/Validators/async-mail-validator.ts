import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: "any"
})
export class AsyncMailValidator implements AsyncValidator {
  constructor(private auth: AngularFireAuth) {
  }

  //////////////////////////////////////////////
  //in the new update of firebase this method dosnt work anymore cuz fire base will check if the mail is used before and return an error if the mail is used
  // to make this method work i have to turn off the email enumeration protection in the firebase authentication settings
  //////////////////////////////////////////////

  // the program will through an error if i didn't use the arrow method this error is due to the js language restrictions not the Angular
  validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
    return this.auth.fetchSignInMethodsForEmail(control.value).then(
      result =>{
        if (result.length === 0)
        {
          return null
        }
        else
        {
          return {EmailTaken:true}
        }
      }
    )
  }
}
