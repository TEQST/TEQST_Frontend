import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-folder',
  templateUrl: './filter-folder.page.html',
  styleUrls: ['./filter-folder.page.scss'],
})
export class FilterFolderPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit(): void {}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
