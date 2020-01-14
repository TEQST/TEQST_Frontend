import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})
export class SpeakPage implements OnInit {
  publishers: { name: string; }[];

  constructor() {
    this.publishers = [
      {
        name: "publisher1"
      },
      {
        name: "publisher2"
      },
      {
        name: "publisher3"
      },
      {
        name: "publisher4"
      }
    ]
  }

  ngOnInit() {
    
  }



}
