import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../../services/usermgmt.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private dataFromServer:any="";
  //all needed user Info
  birthyear:number;
  username:string="";
  language:[object];
  gender:string;
  education:string;
  country:string="";   
  allLangs:[];
  languageString:string="";
  language_ids=[];
  menuLanguageId:number;
  
  

  constructor(public usermgmtService:UsermgmtService) { }

  ngOnInit() {
    this.loadContent();
  }

  //loads content(userInfo) of profile page
  //fills the variables in this class with the given information
  loadContent(){
    var tempLangIds = []
   this.usermgmtService.loadContent().subscribe((dataReturnFromServer:any) => {
      this.dataFromServer = JSON.stringify(dataReturnFromServer);
      this.language = dataReturnFromServer.languages; 
      for(let i=0; i<this.language.length;i++){
        this.languageString += dataReturnFromServer.languages[i].native_name + ", ";
        tempLangIds .push(JSON.stringify(dataReturnFromServer.languages[i].id));           
      }
      this.language_ids = tempLangIds;    
      
      this.languageString = this.languageString.substr(0, this.languageString.length - 2);
      this.username = JSON.parse(this.dataFromServer).username;
      this.birthyear = JSON.parse(this.dataFromServer).birth_year;    
      this.gender = JSON.parse(this.dataFromServer).gender;
      this.education = JSON.parse(this.dataFromServer).education;
      this.country = JSON.parse(this.dataFromServer).country;
      this.getAllLangs();     
   });     
  }

  //loads all Languages which can be spoken
  getAllLangs(){
    this.usermgmtService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    })
  }

  
  //saves Profile information
  // dataToSend is the User Information which is sent to the server
  save(){
    var dataToSend = {birth_year:this.birthyear,language_ids:this.language_ids, country:this.country,gender:this.gender, education:this.education, menu_language_id:this.menuLanguageId}
    this.usermgmtService.updateProfile(dataToSend).subscribe(() => {     
      this.loadContent();
    });
    
    
 

    
  }
  
}
