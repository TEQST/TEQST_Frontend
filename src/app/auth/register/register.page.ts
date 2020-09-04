import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import * as moment from 'moment';

import {AlertManagerService} from '../../services/alert-manager.service';
import {LanguageService} from 'src/app/services/language.service';
import {AuthenticationService} from 'src/app/services/authentication.service';

interface RegisterForm {
  username: string,
  password: string,
  birth_year: number;
  language_ids: string[];
  country: string;
  accent: string;
  education: string;
  gender: string;

}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

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

  performRegister(form){
    console.log(this.registrationData);
    let loginData = (({username, password}) => ({username, password}))(this.registrationData);
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
