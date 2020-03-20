import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../services/usermgmt.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public isLoading = false;

  constructor(public usermgmtService: UsermgmtService,
              private loaderService: LoaderService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit() {
  }

  // calls logout Function of UsermgmtService
  logout() {
    this.usermgmtService.logout();
  }



}
