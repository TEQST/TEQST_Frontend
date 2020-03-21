import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../../services/usermgmt.service';
import { NavController } from '@ionic/angular';
import { AlertManagerService } from 'src/app/services/alert-manager.service';
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private dataFromServer: any = '';
  // all needed user Info
  birthyear: number;
  username = '';
  language: [object];
  gender: string;
  education: string;
  country = '';
  allLangs: [];
  allMenuLangs: string[] = [];
  languageString = '';
  languageIds = [];
  menuLanguageShort = 'en';
  menuLanguageNative: string;

  public isLoading = false;



  constructor(public usermgmtService: UsermgmtService,
              public navCtrl: NavController,
              private alertService: AlertManagerService,
              private loaderService: LoaderService) {
    this.loaderService.getIsLoading().subscribe((isLoading) => this.isLoading = isLoading);
              }

  // loads everytime Page is loaded their content
  ngOnInit() {
    this.loadContent();
  }

  // loads content(userInfo) of profile page
  // fills the variables in this class with the given information
  loadContent() {
    const tempLangIds = [];
    const dataToSend = {
      menu_language_id: localStorage.getItem('MenuLanguage')
    };
    this.usermgmtService.patchProfile(dataToSend).subscribe(() => {});
    this.usermgmtService.loadContent().subscribe((dataReturnFromServer: any) => {
      this.dataFromServer = JSON.stringify(dataReturnFromServer);

      this.language = dataReturnFromServer.languages;
      for (let i = 0; i < this.language.length; i++) {
        this.languageString += dataReturnFromServer.languages[i].native_name + ', ';
        tempLangIds.push(dataReturnFromServer.languages[i].short);
      }
      this.languageIds = tempLangIds;
      this.menuLanguageShort = JSON.parse(this.dataFromServer).menu_language.short;
      this.menuLanguageNative = JSON.parse(this.dataFromServer).menu_language.native_name;
      this.languageString = this.languageString.substr(0, this.languageString.length - 2);
      this.username = JSON.parse(this.dataFromServer).username;
      this.birthyear = JSON.parse(this.dataFromServer).birth_year;
      this.gender = JSON.parse(this.dataFromServer).gender;
      this.education = JSON.parse(this.dataFromServer).education;
      this.country = JSON.parse(this.dataFromServer).country;
      this.getAllLangs();
   });
  }

  // loads all Languages which can be spoken (has to be created before by admin)
  getAllLangs() {
    this.usermgmtService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
      for (const singleLanguage of this.allLangs) {
        if (singleLanguage['is_menu_language'] === true) {
          this.allMenuLangs.push(singleLanguage);
        }
      }
    });
  }
  updateMenuLanguageString() {
    for (const singleLanguage of this.allMenuLangs) {
      if ( singleLanguage['short'] === this.menuLanguageShort) {
        this.menuLanguageNative = singleLanguage['native_name']
      }
    }
  }
  updateLanguageString() {
    this.languageString = '';
    for (const singleLanguage of this.allLangs) {
      for (const oneItem of this.languageIds) {
        if (oneItem === singleLanguage['short']) {
          this.languageString += singleLanguage['native_name'] + ', ';
        }
      }
    }
    this.languageString = this.languageString.substr(0, this.languageString.length - 2);
  }

  // saves Profile information
  // dataToSend is the User Information which is sent to the server
  save() {
    // only save when at least one Language is selected and a Birthyear within the last 100 years
    if ( this.languageIds.length !== 0 && this.birthyear >= moment().year() - 100 && this.birthyear <= moment().year()) {
      // set data to send
      const dataToSend = {
        birth_year: this.birthyear,
        language_ids: this.languageIds,
        country: this.country,
        gender: this.gender,
        education: this.education,
        menu_language_id: this.menuLanguageShort};

      this.usermgmtService.updateProfile(dataToSend).subscribe(() => {
      this.navCtrl.navigateBack('settings');
      this.usermgmtService.setMenuLanguage(this.menuLanguageShort);
      });

    } else {
      const currentYear = moment().year();
      const minimumYear = currentYear - 100;
      // call alertMessage Service
      this.alertService.showErrorAlertNoRedirection(
        'Invalid Input',
        'You have to set at least one Language and a Birthyear between ' + minimumYear + ' and ' +  currentYear);
    }
  }
}
