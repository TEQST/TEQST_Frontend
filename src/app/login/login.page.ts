import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { UsermgmtService } from '../services/usermgmt.service';



 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

}
