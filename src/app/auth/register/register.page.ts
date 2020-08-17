import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import * as moment from 'moment';

import {AlertManagerService} from '../../services/alert-manager.service';
import {LanguageService} from 'src/app/services/language.service';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username = '';
  password = '';
  repassword = '';
  education = 'N';
  birthyear: number;
  country: string;
  accent: string;
  gender = 'N';
  language: [];
  allLangs: [];


  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public authenticationService: AuthenticationService,
    public languageService: LanguageService,
    private alertService: AlertManagerService) { }

  ngOnInit() {
    this.getAllLangs();
  }

  /* sends data to the UsermgmtService to create a new user
     logInData is data which is saved,
     to call instant login after registration without user interaction.
     throws an error if a required field is empty
     or the repeated password field is different */
  registerUser() {
    const dataToSend = {
      username: this.username,
      password: this.password,
      language_ids: this.language,
      birth_year: this.birthyear,
      gender: this.gender,
      education: this.education,
      country: this.country,
      accent: this.accent,
    };
    const logInData = {
      username: this.username,
      password: this.password,
    };
    const currentYear = moment().year();
    const minimumYear = currentYear - 100;

    if (this.username === '' ||
      this.password === '' ||
      this.repassword === '' ||
      this.language === undefined) {
      this.alertService.showErrorAlertNoRedirection(
          'Required fields empty',
          'Please fill out all fields');
    } else if (this.password !== this.repassword) {
      this.alertService.showErrorAlertNoRedirection(
          'Different passwords',
          'The repeated password does not match the original password');
    } else if (this.birthyear < minimumYear || this.birthyear > currentYear) {
      this.alertService.showErrorAlertNoRedirection(
          'Invalid birthyear',
          `Set a birthyear between ${minimumYear} and ${currentYear}`);
    } else {
      this.authenticationService.register(dataToSend, logInData);
    }
  }

  // sets allLAngs[] to all Languages ever created by an Admin
  getAllLangs() {
    this.languageService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    });
  }

}
