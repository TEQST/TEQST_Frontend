import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.page.html',
  styleUrls: ['./create-folder.page.scss'],
})
export class CreateFolderPage implements OnInit {
  @ViewChild('folderName', {  static: false })  folderNameInput: IonInput;

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.folderNameInput.setFocus();
    }, 100);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createFolder() { }

}
