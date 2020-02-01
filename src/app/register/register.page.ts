import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsermgmtService } from '../services/usermgmt.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username:string="";
  password:string="";  
  repassword:string="";
  education:string="N";
  birthyear:number;
  country:string;
  gender:string="N";
  language:[];
  allLangs:[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'authToken'
    })
  };;
  constructor(public navCtrl: NavController, public http: HttpClient,public usermgmtService:UsermgmtService) { }

  ngOnInit() {
    this.getAllLangs();
  }

  goLogin(){
    this.navCtrl.navigateForward("login");
  }
  
  registerUser(){
    var dataToSend = {username:this.username, password:this.password,language_ids:this.language,birth_year: this.birthyear,gender:this.gender,education:this.education,country:this.country};
    var logInData = {username:this.username, password:this.password}
    

       if(this.username == ""||this.password== ""|| this.repassword=="" ){
        alert("Please fill out all fields");    
       }else if(this.password!=this.repassword){
        alert("The repeated password doesn't match the original password");
       } else {
        this.usermgmtService.register(dataToSend, logInData);        
       }
  }
  getAllLangs(){
    this.usermgmtService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    })
  }

}
