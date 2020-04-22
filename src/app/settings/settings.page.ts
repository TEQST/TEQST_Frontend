import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public isLoading = false;

  constructor(public authenticationService: AuthenticationService,
              private loaderService: LoaderService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {
  }

  // calls logout Function of UsermgmtService
  logout() {
    this.authenticationService.logout();
  }



}
