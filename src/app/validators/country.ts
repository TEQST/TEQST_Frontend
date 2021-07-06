import {FormControl} from '@angular/forms';

export class CountryValidator {

  static checkCountry(control: FormControl): any {


    // if (Object.values(obj).indexOf(control.value) === -1) {
    //   console.log('has test1');
    // }

    if (isNaN(control.value)) {
      return {
        'not a number': true,
      };
    }

    if (control.value % 1 !== 0) {
      return {
        'not a whole number': true,
      };
    }

    if (control.value < 1900 || control.value > 2020) {
      return {
        'not realistic': true,
      };
    }

    return null;
  }

}
