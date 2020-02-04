import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.page.html',
  styleUrls: ['./create-text.page.scss']
})
export class CreateTextPage implements OnInit {

  public createTextForm: FormGroup
  public formValid: boolean
  private fileSelected: boolean
  private file: File

  constructor(private formBuilder: FormBuilder,
              private viewCtrl: ModalController) {

    this.createTextForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.createTextForm.valueChanges.subscribe(form => { this.updateFormValidity() })

    this.formValid = false
    this.fileSelected = false
  }

  ngOnInit() { }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  createText(formData) {
    let title = formData.title
    this.viewCtrl.dismiss({
      title: title,
      file: this.file
    })
  }

  setFile(file) {
    this.file = file
    this.fileSelected = true
    this.updateFormValidity()
  }

  updateFormValidity() {
    this.formValid = (this.createTextForm.valid && this.fileSelected)
  }

}
