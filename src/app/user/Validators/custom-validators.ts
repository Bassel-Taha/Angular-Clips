import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  static MatchingControls(Control : string , MatchingControl : string ):ValidatorFn
  {
    return (control: AbstractControl): ValidationErrors | null => {
      let matcedControl = control.get(Control);
      let matchingControl = control.get(MatchingControl)

      if (matchingControl == null) {
        console.log("the matching control cant be found !")
        return {controlNotFound: false};
      }

      if (matcedControl?.value !== matchingControl.value) {
        //adding an error to the matching control to be able to set the validators error message under the wanted input
        matchingControl.setErrors({NoMatch : true})
        // this return also return the error to the form group
        return {NoMatch: true};
      }
      return null;
    }
  }

}
