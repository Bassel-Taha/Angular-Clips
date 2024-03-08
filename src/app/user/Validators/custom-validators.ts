import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  static MatchingControls(Control : string , MatchingControl : string ):ValidatorFn
  {
    return (control: AbstractControl): ValidationErrors | null => {
      let matcedControl = control.get(Control)?.value;
      let matchingControl = control.get(MatchingControl)?.value

      if (matcedControl === '' || matcedControl == null || matchingControl === '' || matchingControl == null) return {controlNotFound: false};

      if (matcedControl !== matchingControl) {
        return {NoMatch: true};
      }
      return null;
    }
  }

}
