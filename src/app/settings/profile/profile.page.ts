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
  language:[];
  gender:string="Male";
  education:null;
  country:string="Germany";
  

  constructor(public usermgmtService:UsermgmtService) { }

  ngOnInit() {
  }

  loadContent(){
   this.usermgmtService.loadContent().subscribe((dataReturnFromServer: any) => {
    this.dataFromServer = JSON.stringify(dataReturnFromServer);
    this.username = JSON.parse(this.dataFromServer).username;
    this.birthyear = JSON.parse(this.dataFromServer).birth_year;
    this.language = JSON.parse(this.dataFromServer).languages;
    this.gender = JSON.parse(this.dataFromServer).gender;
    this.education = JSON.parse(this.dataFromServer).education;
    this.country = JSON.parse(this.dataFromServer).country;
    console.log(this.birthyear);
    console.log(this.language);
    console.log(this.gender);
    console.log(this.education);
    console.log(this.country);
   });  
  }

  setUsername(newData){
    this.username=newData;
  }

  save(){
    var dataToSend = {birth_year:this.birthyear,language_ids:this.language, country:this.country}
    console.log(this.language)
    this.usermgmtService.updateProfile(dataToSend);
  }

  

}
