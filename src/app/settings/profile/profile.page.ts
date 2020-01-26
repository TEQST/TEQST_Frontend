import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  birthyear:null;
  username:null;
  language:null;
  gender:null;
  education:null;
  country:null;

  constructor() { }

  ngOnInit() {
  }

  save(){
    //TODO implement method to save changes 
  }

}
