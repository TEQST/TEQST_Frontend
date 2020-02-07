import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UsermgmtService } from '../services/usermgmt.service';
import { AlertManagerService } from '../services/alert-manager.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";  
  repassword: string = "";
  education: string = "N";
  birthyear: number;
  country: string;
  gender: string = "N";
  language: [];
  allLangs: [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'authToken'
    })
  };;
  constructor(public navCtrl: NavController, public http: HttpClient,public usermgmtService:UsermgmtService, private alertService:AlertManagerService) { }

  ngOnInit() {
    this.getAllLangs();
  }

  //redirects to Login Page
  goLogin(){
    this.navCtrl.navigateForward("login");
  }
  
  //sends Data to UsermgmtService to create a new User
  //LoginData is data which is saved, to call instant Login after Registration without User Interaction
  //throws Error if a required Field is empty or repeated Password is diffrent
  registerUser(){
    console.log(this.language)
    var dataToSend = {username:this.username, password:this.password,language_ids:this.language,birth_year: this.birthyear,gender:this.gender,education:this.education,country:this.country};
    var logInData = {username:this.username, password:this.password}
    
       if(this.username == ""||this.password== ""|| this.repassword==""||this.language == undefined){
         this.alertService.showErrorAlertNoRedirection("Required Fields empty","Please fill out all fields")   
       }else if(this.password!=this.repassword){
         this.alertService.showErrorAlertNoRedirection("Diffrent Passwords","The repeated password doesn't match the original password")
       } else {
        this.usermgmtService.register(dataToSend, logInData);        
       }
  }

  //sets allLAngs[] to all Languages ever created by an Admin
  getAllLangs(){
 
    this.usermgmtService.getLangs().subscribe((dataReturnFromServer: any) => {
     
      this.allLangs = dataReturnFromServer;
    })
  }

}
