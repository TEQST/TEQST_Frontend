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
    });

    this.createTextForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.updateFormValidity();
        });
    this.splitLinesValid = true;
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

  updateFormValidity(): void {
    this.formValid = this.titleValid &&
                     this.fileSelected &&
                     this.languageSelected &&
                   (!this.enableTextSplit || this.splitLinesValid);
  }

  textSplitToggleChanged($event): void {
    this.enableTextSplit = $event.detail.checked;
    this.updateFormValidity();
  }
}
