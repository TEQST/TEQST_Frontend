import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string;
  password:string;
  constructor() { }

  ngOnInit() {
  }
  register(){
    if(this.username.length==0|| this.password.length==0){
      alert("Please fill out all fields")
    }
      alert("Registration completed successfully")
  }

}
