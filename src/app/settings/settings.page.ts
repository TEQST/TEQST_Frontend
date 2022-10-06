import {Component} from '@angular/core';

import {LoaderService} from 'src/app/services/loader.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends BaseComponent {

  constructor(public authenticationService: AuthenticationService,
              public loaderService: LoaderService) {
    super(loaderService);
  }

  // calls logout Function of UsermgmtService
  logout(): void {
    this.authenticationService.logout();
  }

}
