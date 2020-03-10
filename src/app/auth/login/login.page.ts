import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { UsermgmtService } from '../../services/usermgmt.service';
import { Constants } from '../../constants';
import { MenuLanguageSelectorComponent } from './menu-language-selector/menu-language-selector.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  SERVER_URL = Constants.SERVER_URL;
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public usermgmtService: UsermgmtService, public popoverController: PopoverController) { }


  ngOnInit() {
  }

  async presentMenuLanguages(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuLanguageSelectorComponent,
      event: ev,
      translucent: true,
      showBackdrop: false
    });
    return await popover.present();
  }

  // gets Username and Password and calls with those login in UsermgmtService
  login() {
    const dataToSend = {username: this.username, password: this.password};
    this.usermgmtService.login(dataToSend);
  }

  redirect() {
    window.open(this.SERVER_URL + '/admin');
  }

}
