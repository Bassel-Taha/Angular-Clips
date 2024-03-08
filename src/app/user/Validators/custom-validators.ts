import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {

  //todo the function isnt dynamic so it cant be reused the next step is to make it dynamic by accepting parameters of the matching controls
  static passwordMatch(control: AbstractControl) : ValidationErrors | null{
    let password = control.value.password;
    let confirm_password = control.value.confirm_password;

    if (password === '' || password == null || confirm_password === '' || confirm_password == null) return {controlNotFound : false};

    if (password !== confirm_password) {
      return { NoMatch: true };
    }
    return null;
  }

}
