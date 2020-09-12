import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import { RegisterForm } from 'src/app/interfaces/register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public showPassword = false;
  public currentRegisterStep = 1;
  public registrationData = {} as RegisterForm;
  public allLangs = [];

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public authenticationService: AuthenticationService,
    public languageService: LanguageService,
    private alertService: AlertManagerService) { }

  ngOnInit() {
    this.getAllLangs();
  }

  nextStep(form) {
    this.currentRegisterStep = 2;
  }

  performRegister(form) {
    let loginData = (({ username, password }) => ({ username, password }))(this.registrationData);
    this.authenticationService.register(this.registrationData).subscribe(() => {
      this.authenticationService.login(loginData)
    }, (error: any) => {
      this.currentRegisterStep = 1;
      this.alertService.showErrorAlertNoRedirection('Username already exists',
        'A user with that username already exists, please choose another username');
    });
  }

  // sets allLAngs[] to all Languages ever created by an Admin
  getAllLangs() {
    this.languageService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    });
  }

}
