import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { UsermgmtService } from '../services/usermgmt.service';
import { Constants } from '../constants';



 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  SERVER_URL = Constants.SERVER_URL
  username:string;
  password:string;
  
  

  constructor(public navCtrl: NavController,public usermgmtService:UsermgmtService) { }


  ngOnInit() {
  }

  //gets Username and Password and calls with those login in UsermgmtService
  login(){    
    var dataToSend = {username:this.username, password:this.password};    
    this.usermgmtService.login(dataToSend);
  
  }  

  //redirects to Register Page
  goRegister(){
    this.navCtrl.navigateForward("register");
   
  }

  redirect(){
   
    window.open(this.SERVER_URL + "/admin");
  }

}
