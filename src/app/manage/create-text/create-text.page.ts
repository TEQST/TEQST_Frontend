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
    // close the modal without passing data
    this.viewCtrl.dismiss();
  }

  createText(formData) {
    let title = formData.title
    // close the modal and pass its data back to the view
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
    // angular cannot detect by itself whether a file is selected or not in its form validation
    this.formValid = (this.createTextForm.valid && this.fileSelected)
  }

}
