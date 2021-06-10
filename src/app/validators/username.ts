import {UsermgmtService} from './../services/usermgmt.service';
import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public usermgmtService: UsermgmtService) {}

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise((resolve) => {

      this.debouncer = setTimeout(() => {

        this.usermgmtService.checkUsername(control.value)
            .subscribe((response) => {
              const userNameIsAvailable = response['available'];
              if (userNameIsAvailable) {
                resolve(null);
              } else {
                resolve({
                  'username taken': true,
                });
              }
            });

      }, 1000);

    });
  }

}
