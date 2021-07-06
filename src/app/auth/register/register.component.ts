import {Country} from './../../interfaces/country';
import {UsermgmtService} from 'src/app/services/usermgmt.service';
import {AgeValidator} from './../../validators/age';
import {UsernameValidator} from './../../validators/username';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {LanguageService} from 'src/app/services/language.service';
import {AlertManagerService} from 'src/app/services/alert-manager.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public showPassword = false;
  public currentRegisterStep = 1;
  public allLangs = [];
  public stepOneForm: FormGroup;
  public stepTwoForm: FormGroup;

  private countries : Country[] = [];
  public filteredCountries: Country[];
  public showCountryDropdown = false;

  private accents = [];
  public filteredAccents = []
  public showAccentDropdown = false;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public authenticationService: AuthenticationService,
    public languageService: LanguageService,
    private alertService: AlertManagerService,
    private formBuilder: FormBuilder,
    private usernameValidator: UsernameValidator,
    private usermgmtService: UsermgmtService) {
    this.stepOneForm = formBuilder.group({
      username: ['',
        Validators.required,
        usernameValidator.checkUsername.bind(usernameValidator),
      ],
      password: ['', Validators.required],
      birth_year: ['', [Validators.required, AgeValidator.checkAge]],
      language_ids: [[], Validators.required],
    });

    this.stepTwoForm = formBuilder.group({
      email: ['', Validators.email],
      country: ['', Validators.required],
      accent: ['', Validators.required],
      education: [''],
      gender: [''],
    });
    usermgmtService.getCountryList().then((list) => {
      this.countries = list;
      this.filteredCountries = list;
    });
    usermgmtService.getAccents().subscribe((accents) => {
      this.accents = accents;
      this.filteredAccents = accents;
    });
  }

  ngOnInit() {
    this.getAllLangs();
  }

  nextStep() {
    this.currentRegisterStep = 2;
  }

  toggleCountryDropdown(): void {
    this.showCountryDropdown = !this.showCountryDropdown;

  }

  clearCountryDropdown(): void {
    this.showCountryDropdown = false;
    this.stepTwoForm.patchValue({country: ''});
  }

  toggleAccentDropdown(): void {
    this.showAccentDropdown = !this.showAccentDropdown;

  }

  get errorControl() {
    return this.stepOneForm.controls;
  }

  performRegister() {
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
    // extract username and password into a new object
    const loginData = (({username, password}) => {
      return {username, password};
    })(this.stepOneForm.value);

    this.authenticationService.register(registrationData).subscribe(() => {
      this.authenticationService.login(loginData);
    }, (error: any) => {
      this.currentRegisterStep = 1;
      this.alertService.showErrorAlertNoRedirection('Username already exists',
          `A user with that username already exists, 
          please choose another username`);
    });
  }

  // sets allLAngs[] to all Languages ever created by an Admin
  getAllLangs() {
    this.languageService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    });
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
      return accent.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }

  public selectCountry(country: Country): void {
    this.stepTwoForm.patchValue({country: country.english_name});
    this.toggleCountryDropdown();
  }

  public selectAccent(accent: string): void {
    this.stepTwoForm.patchValue({accent: accent});
    this.toggleAccentDropdown();
  }


}
