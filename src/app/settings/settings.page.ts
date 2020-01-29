import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../services/usermgmt.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public usermgmtService:UsermgmtService) { }

  ngOnInit() {
  }
  logout(){
    this.usermgmtService.logout();
  }

}
