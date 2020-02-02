import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ManageFolderService } from 'src/app/services/manage-folder.service';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.page.html',
  styleUrls: ['./create-folder.page.scss'],
})
export class CreateFolderPage implements OnInit {

  @Input() parentId: any
  @ViewChild('folderName', {  static: false })  folderNameInput: IonInput

  private validatorPattern = '^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$'
  private folderInfo : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private manageFolderService: ManageFolderService,
              public viewCtrl: ModalController) {

    this.folderInfo = this.formBuilder.group({
      folderName: ['', Validators.pattern(this.validatorPattern)],
    })

  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
        this.folderNameInput.setFocus()
    }, 100)
  }

  submitForm(){
    let formData = this.folderInfo.value
    this.viewCtrl.dismiss({
      folderName: formData.folderName
    })
  }

  dismissForm() {
    this.viewCtrl.dismiss()
  }

}
