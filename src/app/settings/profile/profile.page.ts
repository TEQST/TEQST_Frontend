import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';

import {UsermgmtService} from 'src/app/services/usermgmt.service';
import {Language} from 'src/app/interfaces/language';
import {LoaderService} from 'src/app/services/loader.service';
import {LanguageService} from 'src/app/services/language.service';
import {AgeValidator} from 'src/app/validators/age';
import {BaseComponent} from 'src/app/base-component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends BaseComponent implements OnInit {

  public profileForm: FormGroup;

  allLangs: Language[] = [];
  allMenuLangs: Language[] = [];

  constructor(public usermgmtService: UsermgmtService,
              public languageService: LanguageService,
              public navCtrl: NavController,
              public loaderService: LoaderService,
              private formBuilder: FormBuilder,
              private toastController: ToastController) {

    super(loaderService);

    this.profileForm = this.formBuilder.group({
      username: [''],
      email: ['', Validators.email],
      birth_year: ['', [Validators.required, AgeValidator.checkAge]],
      gender: [''],
      education: [''],
      country: [''],
      accent: [''],
      language_ids: [[]],
      menu_language_id: [''],
    });
  }

  // loads every time Page is loaded their content
  ngOnInit(): void {
    this.loadContent();
  }

  private async loadContent(): Promise<void> {
    // load menu languages
    await this.languageService.getAllMenuLanguages().then((menuLanguages)=> {
      this.allMenuLangs = menuLanguages;
    });
    // load spoken languages
    await this.languageService.getLangs().toPromise().then((languages) => {
      this.allLangs = languages;
    });
    this.usermgmtService.getProfileData().subscribe((profileData) => {
      const formData = {
        ...profileData,
        menu_language_id: profileData.menu_language.short,
        language_ids: profileData.languages.map((lang) => lang.short),
      };
      this.profileForm.patchValue(formData);
      this.addFormChangeEvents();
    });
  }

  addFormChangeEvents(): void {
    this.profileForm.get('language_ids').valueChanges
        .subscribe(() => {
          setTimeout(() => { // wait for next tick since value hasn't been updated see https://www.tektutorialshub.com/angular/valuechanges-in-angular-forms/
            this.saveProfileData();
          });
        });
    this.profileForm.get('menu_language_id').valueChanges
        .subscribe(() => {
          setTimeout(() => { // wait for next tick since value hasn't been updated see https://www.tektutorialshub.com/angular/valuechanges-in-angular-forms/
            this.saveProfileData();
          });
        });
  }

  saveProfileData(): void {
    if (!this.profileForm.valid) {
      this.presentSaveFailToast();
      return;
    }
    this.usermgmtService.updateProfile(this.profileForm.value).subscribe(() => {
      this.languageService.setMenuLanguage(
          this.profileForm.value.menu_language_id,
      );
      this.presentSavedToast();
    }, () => {
      this.presentSaveFailToast();
    });
  }

  async presentSavedToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Your profile has been updated.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async presentSaveFailToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'The data you entered is invalid.',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  saveIfEnter($event): void {
    if ($event.code == 'Enter') {
      this.saveProfileData();
    }
  }

}
