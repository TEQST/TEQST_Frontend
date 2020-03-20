import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.page.html',
  styleUrls: ['./create-text.page.scss']
})
export class CreateTextPage implements OnInit {

  @ViewChild('titleInput', {  static: false })  titleInput: IonInput
  @ViewChild('selectFileWrapper', {  static: false })  selectFileWrapper: object

  public formValid: boolean
  public titleValid: boolean
  public fileSelected: boolean
  /* allow any characters except \,/,:,*,<,>,| and whitespaces
     but not filenames starting with the character . */
  private validatorPattern = new RegExp('^(?!\\.)[^\\\\\/:\\*"<>\\| ]+$')
  public createTextForm: FormGroup
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

  ngAfterViewInit() {
    setTimeout(() => {
        // setting the focus only works in most webbrowsers after a small timeout
        this.titleInput.setFocus()
    }, 100)
  }

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
    else return { 'textTitle': true }
  }

  updateFormValidity() {    
    this.formValid = this.titleValid && this.fileSelected
  }
}
