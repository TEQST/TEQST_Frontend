import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../../services/usermgmt.service';
import { JsonPipe } from '@angular/common';

const myObj ={
  "id": 1,
  "english_name": "English",
  "native_name": "English",
  "short": "en"
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private dataFromServer:any="";
  birthyear:number;
  username:string="";
  language:[object];
  gender:string;
  education:string;
  country:string="Germany";   
  allLangs:[];
  languageString:string="";
   language_ids=[];
  
  

  constructor(public usermgmtService:UsermgmtService) { }

  ngOnInit() {
    this.loadContent();
  }

  loadContent(){
    var tempLangIds = []
   this.usermgmtService.loadContent().subscribe((dataReturnFromServer:any) => {
    this.dataFromServer = JSON.stringify(dataReturnFromServer);
     //speichert die Sprachen in einem Array Sprache englisch ist arr[0]
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

  getAllLangs(){
    this.usermgmtService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    })
  }

  

  save(){
    var dataToSend = {birth_year:this.birthyear,language_ids:this.language_ids, country:this.country}
    this.usermgmtService.updateProfile(dataToSend);
  }
}
