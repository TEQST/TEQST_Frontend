import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:null;
  password:null;  
  repassword:null;
  birthyear:null;
  country:null;
  gender:null;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  registerUser(){
    if(this.username == null||this.password== null ){
      alert("Please fill out all fields")    
    }else if(this.password==this.repassword){
      alert("Registration completed successfully")
      //this.navCtrl.navigateForward("speak");     
      console.log("geschlecht "+ this.gender); 
    }else{
      alert("The repeated password doesn't match the original password")
    } 
  }

}
