import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalController, IonInput} from '@ionic/angular';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {UsermgmtService} from 'src/app/services/usermgmt.service';
import {LanguageService} from 'src/app/services/language.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.page.html',
  styleUrls: ['./create-text.page.scss'],
})
export class CreateTextPage implements OnInit, OnDestroy {

  @ViewChild('titleInput', {static: false}) titleInput: IonInput;
  @ViewChild('selectFileWrapper', {static: false}) selectFileWrapper: object;

  private ngUnsubscribe = new Subject<void>();

  public formValid: boolean;
  public titleValid: boolean;
  public languageSelected: boolean;
  public fileSelected: boolean;
  public enableTextSplit: boolean;
  public splitLinesValid: boolean;
  public availableLanguages: any;
  public language: string;
  public languageNative: string;
  public createTextForm: FormGroup;

  /* allow any characters except \,/,:,*,<,>,| and whitespaces
     but not filenames starting with the character . */
  private validatorPattern = new RegExp('^(?!\\.)[^\\\\\/:\\*"<>\\| ]+$');
  private file: File;
  private existingTextNames: string[];
  private textSplitLinesMin = 5;
  private textSplitLinesMax = 100;
  private textSplitLinesDefault = 30;

  constructor(private formBuilder: FormBuilder,
              private viewCtrl: ModalController,
              public usermgmtService: UsermgmtService,
              public languageService: LanguageService) {


    this.createTextForm = this.formBuilder.group({
      title: ['', (control) => {
        return this.textTitleValidator(control);
      }],
      language: ['', (control) => {
        return this.languageValidator(control);
      }],
      splitLines: [this.textSplitLinesDefault, (control) => {
        return this.splitLinesValidator(control);
      }],
    });

    this.createTextForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.updateFormValidity();
        });
    this.splitLinesValid = true;
  }

  ngOnInit() {
    this.languageService.getLangs().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
          this.availableLanguages = data;
        });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  dismiss() {
    // close the modal without passing data
    this.viewCtrl.dismiss();
  }

  createText(formData) {
    // close the modal and pass its data back to the view
    const returnData = {
      title: formData.title,
      textfile: this.file,
      language: formData.language};

    if (this.enableTextSplit) {
      returnData['max_lines'] = formData.splitLines;
    }

    this.viewCtrl.dismiss(returnData);
  }

  setFile(file) {
    this.file = file;
    this.fileSelected = true;
    this.updateFormValidity();
  }

  textTitleValidator(control: FormControl) {
    const title = control.value;
    this.titleValid = (this.validatorPattern.test(title) &&
                       title.trim() !== '' && // title not empty
                      !this.existingTextNames.includes(title));

    if (!this.titleValid) {
      return {textTitle: true};
    }
    return null;
  }

  languageValidator(control: FormControl) {
    const language = control.value;
    this.languageSelected = (language != '');

    if (!this.languageSelected) {
      return {textTitle: true};
    }
    return null;
  }

  splitLinesValidator(control: FormControl) {
    const lines = control.value;
    this.splitLinesValid = lines >= this.textSplitLinesMin &&
                           lines <= this.textSplitLinesMax;

    if (!this.splitLinesValid) {
      return {textSplitLines: true};
    }
    return null;
  }

  updateFormValidity() {
    this.formValid = this.titleValid &&
                     this.fileSelected &&
                     this.languageSelected &&
                   (!this.enableTextSplit || this.splitLinesValid);
  }

  textSplitToggleChanged($event) {
    this.enableTextSplit = $event.detail.checked;
    this.updateFormValidity();
  }
}
