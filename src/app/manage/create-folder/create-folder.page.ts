import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.page.html',
  styleUrls: ['./create-folder.page.scss'],
})
export class CreateFolderPage implements OnInit {

  @Input() parentId: any
  @ViewChild('folderName', {  static: false })  folderNameInput: IonInput

  // allow only letters of the english alphabet and one whitespace between words
  private validatorPattern = '^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$'
  public folderInfo : FormGroup;

  constructor(private formBuilder: FormBuilder,
              public viewCtrl: ModalController) {

    this.folderInfo = this.formBuilder.group({
      folderName: ['', Validators.pattern(this.validatorPattern)],
    })

  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
        // setting the focus only works in most webbrowsers after a small timeout
        this.folderNameInput.setFocus()
    }, 100)
  }

  submitForm(){
    let formData = this.folderInfo.value
    // close the modal passing its data
    this.viewCtrl.dismiss({
      folderName: formData.folderName
    })
  }

  dismissForm() {
    // close the modal without passing data
    this.viewCtrl.dismiss()
  }

}
