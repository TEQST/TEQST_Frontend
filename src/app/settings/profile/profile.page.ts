import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../../services/usermgmt.service';
import { NavController } from '@ionic/angular';


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
  languageString = '';
  languageIds = [];
  menuLanguageId: number;



  constructor(public usermgmtService: UsermgmtService, public navCtrl: NavController) { }

  // loads everytime Page is loaded their content
  ngOnInit() {
    this.loadContent();
  }

  // loads content(userInfo) of profile page
  // fills the variables in this class with the given information
  loadContent() {
    const tempLangIds = [];
    this.usermgmtService.loadContent().subscribe((dataReturnFromServer: any) => {
      this.dataFromServer = JSON.stringify(dataReturnFromServer);
      this.language = dataReturnFromServer.languages;
      for (let i = 0; i < this.language.length; i++) {
        this.languageString += dataReturnFromServer.languages[i].native_name + ', ';
        tempLangIds .push(JSON.stringify(dataReturnFromServer.languages[i].id));
      }
      this.languageIds = tempLangIds;

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
    });
  }


  // saves Profile information
  // dataToSend is the User Information which is sent to the server
  save() {
    const dataToSend = {
      birth_year: this.birthyear,
      language_ids: this.languageIds,
      country: this.country,
      gender: this.gender,
      education: this.education,
      menu_language_id: this.menuLanguageId};
    this.usermgmtService.updateProfile(dataToSend).subscribe(() => {

    this.navCtrl.navigateBack('settings');
     // this.loadContent();
    });
  }
}
