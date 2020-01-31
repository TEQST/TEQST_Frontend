import { Component, OnInit } from '@angular/core';
import { UsermgmtService } from '../../services/usermgmt.service';

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
  language_ids;
  allLangs:[];
  

  constructor(public usermgmtService:UsermgmtService) { }

  ngOnInit() {
    this.loadContent();
  }

  loadContent(){
   this.usermgmtService.loadContent().subscribe((dataReturnFromServer:any) => {
    this.dataFromServer = JSON.stringify(dataReturnFromServer);
     //speichert die Sprachen in einem Array Sprache englisch ist arr[0]
     this.language = dataReturnFromServer.languages;       
   
     this.username = JSON.parse(this.dataFromServer).username;
     this.birthyear = JSON.parse(this.dataFromServer).birth_year;    
     //this.language = this.language["english_name"];
     this.gender = JSON.parse(this.dataFromServer).gender;
     this.education = JSON.parse(this.dataFromServer).education;
     this.country = JSON.parse(this.dataFromServer).country;
    console.log(this.birthyear);
    console.log(this.language[0]);
    
    console.log(this.gender);
    console.log(this.education);
    console.log(this.country);
   });  
  }
  getAllLangs(){
    this.usermgmtService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.dataFromServer = JSON.stringify(dataReturnFromServer);
      this.allLangs = dataReturnFromServer;
      console.log(this.allLangs);
      console.log(this.dataFromServer);
    })
  }

  

  save(){
    var dataToSend = {birth_year:this.birthyear,language_ids:this.language_ids, country:this.country}
    console.log(this.language)
    this.usermgmtService.updateProfile(dataToSend);
  }

  

}
