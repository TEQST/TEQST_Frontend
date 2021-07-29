import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../services/loader.service';
import {AuthenticationService} from '../services/authentication.service';
import {BaseComponent} from '../base-component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends BaseComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService,
              public loaderService: LoaderService) {
    super(loaderService);
  }

  ngOnInit() {}

  // calls logout Function of UsermgmtService
  logout() {
    this.authenticationService.logout();
  }


}
