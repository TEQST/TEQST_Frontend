import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public showPassword = false;

  constructor(
    public navCtrl: NavController,
    public authenticationService: AuthenticationService) {}

  // gets Username and Password and calls with those login in UsermgmtService
  performLogin(form): void {
    this.authenticationService.login(form.value);
  }
}
