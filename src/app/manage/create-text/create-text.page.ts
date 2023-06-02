import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalController, IonInput, IonItem} from '@ionic/angular';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {UsermgmtService} from 'src/app/services/usermgmt.service';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.page.html',
  styleUrls: ['./create-text.page.scss'],
})
export class CreateTextPage implements OnInit, OnDestroy {

  @ViewChild('titleInput', {static: false}) titleInput: IonInput;
  @ViewChild('selectFileWrapper', {static: false}) selectFileWrapper: IonItem;

  public formValid: boolean;
  public titleValid: boolean;
  public languageSelected: boolean;
  public fileSelected: boolean;
  public enableTextSplit: boolean;
  public enableLineSplit: boolean;
  public splitLinesValid: boolean;
  public splitCharsValid: boolean;
  public availableLanguages: any;
  public language: string;
  public languageNative: string;
  public tokenize = "tknz";
  public regexSeparator = "regSep";
  public separator: string;
  public createTextForm: FormGroup;

  /* allow any characters except \,/,:,*,<,>,| and whitespaces
     but not filenames starting with the character . */
  private validatorPattern = new RegExp('^(?!\\.)[^\\\\\/:\\*"<>\\| ]+$');
  private file: File;
  private existingTextNames: string[];
  private textSplitLinesMin = 5;
  private textSplitLinesMax = 100;
  private textSplitLinesDefault = 30;
  private lineSplitCharsMin = 30;
  private lineSplitCharsMax = 2000;
  private lineSplitCharsDefault = 250;
  private ngUnsubscribe = new Subject<void>();

  constructor(public usermgmtService: UsermgmtService,
              public languageService: LanguageService,
              private formBuilder: FormBuilder,
              private viewCtrl: ModalController) {

    this.createTextForm = this.formBuilder.group({
      title: ['', (control): {textTitle: boolean} => {
        return this.textTitleValidator(control);
      }],
      language: ['', (control): {textTitle: boolean} => {
        return this.languageValidator(control);
      }],
      splitLines: [this.textSplitLinesDefault,
        (control): {textSplitLines: boolean} => {
          return this.splitLinesValidator(control);
        }],
      splitChars: [this.lineSplitCharsDefault,
        (control): {lineSplitChars: boolean} => {
          return this.splitCharsValidator(control);
        }],
      separator: ['\\n\\n'],
    });

    this.createTextForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.updateFormValidity();
        });
    this.splitLinesValid = true;
    this.splitCharsValid = true;
    this.separator = this.tokenize; 
  }

  ngOnInit(): void {
    this.languageService.getLangs().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
          this.availableLanguages = data;
        });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  dismiss(): void {
    // close the modal without passing data
    this.viewCtrl.dismiss();
  }

  createText(formData): void {
    // close the modal and pass its data back to the view
    const returnData = {
      title: formData.title,
      textfile: this.file,
      language: formData.language};

    if (this.enableTextSplit) {
      returnData['max_lines'] = formData.splitLines;
    }

    if (this.enableLineSplit) {
      returnData['max_chars'] = formData.splitChars;
    }

    if (this.separator === this.tokenize) {
      returnData['tokenize'] = true;
    }
    if (this.separator === this.regexSeparator) {
      returnData['separator'] = formData.separator;
    }

    this.viewCtrl.dismiss(returnData);
  }

  setFile(file): void {
    this.file = file;
    this.fileSelected = true;
    this.updateFormValidity();
  }

  textTitleValidator(control: FormControl): {textTitle: boolean} {
    const title = control.value;
    this.titleValid = (this.validatorPattern.test(title) &&
                       title.trim() !== '' && // title not empty
                      !this.existingTextNames.includes(title));

    if (!this.titleValid) {
      return {textTitle: true};
    }
    return null;
  }

  languageValidator(control: FormControl): {textTitle: boolean} {
    const language = control.value;
    this.languageSelected = (language != '');

    if (!this.languageSelected) {
      return {textTitle: true};
    }
    return null;
  }

  splitLinesValidator(control: FormControl): {textSplitLines: boolean} {
    const lines = control.value;
    this.splitLinesValid = lines >= this.textSplitLinesMin &&
                           lines <= this.textSplitLinesMax;

    if (!this.splitLinesValid) {
      return {textSplitLines: true};
    }
    return null;
  }

  splitCharsValidator(control: FormControl): {lineSplitChars: boolean} {
    const chars = control.value;
    this.splitCharsValid = chars >= this.lineSplitCharsMin &&
                           chars <= this.lineSplitCharsMax;

    if (!this.splitLinesValid) {
      return {lineSplitChars: true};
    }
    return null;
  }

  updateFormValidity(): void {
    this.formValid = this.titleValid &&
                     this.fileSelected &&
                     this.languageSelected &&
                   (!this.enableTextSplit || this.splitLinesValid) &&
                   (!this.enableLineSplit || this.splitCharsValid);
  }

  textSplitToggleChanged($event): void {
    this.enableTextSplit = $event.detail.checked;
    this.updateFormValidity();
  }

  lineSplitToggleChanged($event): void {
    this.enableLineSplit = $event.detail.checked;
    this.updateFormValidity();
  }

  sepRadioChanged($event): void {
    console.log($event)
    this.separator = $event.detail.value;
    console.log(this.separator)
    this.updateFormValidity();
  }
}
