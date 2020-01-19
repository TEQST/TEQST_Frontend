import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username:string;
  password:string;

  constructor(public navCtrl: NavController) { }


  ngOnInit() {
  }
  login(){
    console.log("Username: "+ this.username);
    console.log("Password: "+ this.password);
  }

  goRegister(){
    this.navCtrl.navigateForward("register");
  }

}
