import {Language} from './../../interfaces/language';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {UsermgmtService} from '../../services/usermgmt.service';
import {NavController, ToastController} from '@ionic/angular';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {LoaderService} from 'src/app/services/loader.service';
import {LanguageService} from 'src/app/services/language.service';
import {AgeValidator} from 'src/app/validators/age';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profileForm: FormGroup;


  allLangs: Language[] = [];
  allMenuLangs: Language[] = [];

  public isLoading = false;


  constructor(public usermgmtService: UsermgmtService,
              public languageService: LanguageService,
              public navCtrl: NavController,
              private loaderService: LoaderService,
              private formBuilder: FormBuilder,
              private toastController: ToastController) {
    this.profileForm = formBuilder.group({
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
    this.loaderService.getIsLoading()
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  // loads every time Page is loaded their content
  ngOnInit() {
    this.loadContent();
  }

  private async loadContent(): Promise<void> {

    await this.languageService.getAllMenuLanguages().then((menuLanguages)=> {
      this.allMenuLangs = menuLanguages;
    });

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
      console.log(this.profileForm);
    });
  }

  saveProfileData(): void {
    this.usermgmtService.updateProfile(this.profileForm.value).subscribe(() => {
      this.languageService.setMenuLanguage(
          this.profileForm.value.menu_language_id,
      );
      this.presentSavedToast();
    },
    );
  }

  async presentSavedToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Your profile has been updated.',
      duration: 2000,
    });
    toast.present();
  }

}
