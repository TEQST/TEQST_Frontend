import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.page.html',
  styleUrls: ['./create-text.page.scss']
})
export class CreateTextPage implements OnInit {

  public formValid: boolean
  public titleValid: boolean
  /* allow any characters except \,/,:,*,<,>,| and whitespaces
     but not filenames starting with the character . */
  private validatorPattern = new RegExp('^(?!\\.)[^\\\\\/:\\*"<>\\| ]+$')
  public createTextForm: FormGroup
  private fileSelected: boolean
  private file: File
  private existingTextNames: string[]

  constructor(private formBuilder: FormBuilder,
              private viewCtrl: ModalController) {

    this.createTextForm = this.formBuilder.group({
      title: ['', control => { return this.textTitleValidator(control)} ]
    });

    this.createTextForm.valueChanges.subscribe(() => { this.updateFormValidity() })

    this.formValid = false
    this.titleValid = false
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

  textTitleValidator(control: FormControl) {
    let title = control.value
    this.titleValid = (this.validatorPattern.test(title) &&
                       title.trim() != '' &&  // title not empty
                      !this.existingTextNames.includes(title))
    if (this.titleValid) return null
    else {
      return { 'textTitle': true };
    }
  }

  updateFormValidity() {    
    this.formValid = this.titleValid && this.fileSelected
  }
}
