import { FormControl } from '@angular/forms';

export class AgeValidator {

  static checkAge(control: FormControl): any {

    if (isNaN(control.value)) {
      return {
          'not a number': true
      };
    }

    if (control.value % 1 !== 0) {
      return {
          'not a whole number': true
      };
    }

    if (control.value < 1900 || control.value > 2020) {
      return {
          'not realistic': true
      };
    }

    return null;
  }

}