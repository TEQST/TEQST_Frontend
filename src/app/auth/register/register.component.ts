import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {ServicesAgreementComponent}
  from './services-agreement/services-agreement.component';
import {Country} from 'src/app/interfaces/country';
import {UsermgmtService} from 'src/app/services/usermgmt.service';
import {AgeValidator} from 'src/app/validators/age';
import {UsernameValidator} from 'src/app/validators/username';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {LanguageService} from 'src/app/services/language.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public showPassword = false;
  public showCountryDropdown = false;
  public showAccentDropdown = false;
  // query parameter for redirection
  // when user clicks on link without being logged in
  public qParams = {};
  public currentRegisterStep = 1;
  public stepOneForm: FormGroup;
  public stepTwoForm: FormGroup;
  public allLangs = [];
  public filteredCountries: Country[];
  public filteredAccents = []

  private countries : Country[] = [];
  private accents = [];

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public authenticationService: AuthenticationService,
              public languageService: LanguageService,
              private alertService: AlertManagerService,
              private formBuilder: FormBuilder,
              private usernameValidator: UsernameValidator,
              private modalController: ModalController,
              private usermgmtService: UsermgmtService,
              private route: ActivatedRoute) {

    this.stepOneForm = this.formBuilder.group({
      username: ['',
        Validators.required,
        this.usernameValidator.checkUsername.bind(this.usernameValidator),
      ],
      password: ['', Validators.required],
      birth_year: ['', [Validators.required, AgeValidator.checkAge]],
      language_ids: [[], Validators.required],
      checkbox: [, Validators.requiredTrue],
    });

    this.stepTwoForm = this.formBuilder.group({
      email: ['', Validators.email],
      country: ['', Validators.required],
      accent: ['', Validators.required],
      education: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.usermgmtService.getCountryList().then((list) => {
      this.countries = list;
      this.filteredCountries = list;
    });
    this.usermgmtService.getAccents().subscribe((accents) => {
      this.accents = accents;
      this.filteredAccents = accents;
    });
  }

  ngOnInit(): void {
    const next = this.route.snapshot.queryParamMap.get('next');
    this.qParams = next ? {next}: {}; // convert to object
    this.getAllLangs();
  }

  previousStep(): void {
    this.currentRegisterStep = 1;
  }

  nextStep(): void {
    this.currentRegisterStep = 2;
  }

  openCountryDropdown(): void {
    this.showCountryDropdown = true;
  }

  closeCountryDropdown(): void {
    this.showCountryDropdown = false;
  }

  clearCountryDropdown(): void {
    this.closeCountryDropdown();
    this.stepTwoForm.patchValue({country: ''});
  }

  openAccentDropdown(): void {
    this.showAccentDropdown = true;
  }

  closeAccentDropdown(): void {
    this.showAccentDropdown = false;
  }

  get errorControl() {
    return this.stepOneForm.controls;
  }

  performRegister(): void {
    // combine the value object of the forms into one
    const registrationData = {
      ...this.stepOneForm.value,
      ...this.stepTwoForm.value,
    };
    // filter out all properties with empty strings
    // so the server accepts the request
    for (const value in registrationData) {
      if (registrationData[value] === '') {
        delete registrationData[value];
      }
    }

    // change country name to country short
    const countryObj = this.countries.find((country) => {
      return country.english_name === registrationData.country;
    });
    registrationData.country = countryObj.short;

    // extract username and password into a new object
    const loginData = (({username, password}) => {
      return {username, password};
    })(this.stepOneForm.value);

    this.authenticationService.register(registrationData).subscribe(() => {
      this.authenticationService.login(loginData);
    }, () => {
      this.currentRegisterStep = 1;
      this.alertService.showErrorAlertNoRedirection('Username already exists',
          `A user with that username already exists, 
          please choose another username`);
    });
  }

  // sets allLAngs[] to all Languages ever created by an Admin
  getAllLangs(): void {
    this.languageService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    });
  }

  async presentServicesAgreement() {
    const popover = await this.modalController.create({
      component: ServicesAgreementComponent,
    });
    return await popover.present();
  }

  public filterCountries(event: CustomEvent): void {
    const searchTerm = event.detail.value;
    this.filteredCountries = this.countries.filter((country) => {
      return country.english_name.toLowerCase()
          .startsWith(searchTerm.toLowerCase());
    });
  }

  public filterAccents(event: CustomEvent): void {
    const searchTerm = event.detail.value;
    this.filteredAccents = this.accents.filter((accent) => {
      return accent.toLowerCase()
          .startsWith(searchTerm.toLowerCase());
    });
  }

  public selectCountry(country: Country): void {
    this.stepTwoForm.patchValue({country: country.english_name});
    this.closeCountryDropdown();
  }

  public selectAccent(accent: string): void {
    this.stepTwoForm.patchValue({accent: accent});
    this.closeAccentDropdown();
  }

}
