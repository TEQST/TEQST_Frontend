import {ServicesAgreementComponent} from './services-agreement/services-agreement.component';
import {AgeValidator} from './../../validators/age';
import {UsernameValidator} from './../../validators/username';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
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
  public currentRegisterStep = 1;
  public allLangs = [];
  public stepOneForm: FormGroup;
  public stepTwoForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public authenticationService: AuthenticationService,
    public languageService: LanguageService,
    private alertService: AlertManagerService,
    private formBuilder: FormBuilder,
    private usernameValidator: UsernameValidator,
    private modalController: ModalController) {
    this.stepOneForm = formBuilder.group({
      username: ['',
        Validators.required,
        usernameValidator.checkUsername.bind(usernameValidator),
      ],
      password: ['', Validators.required],
      birth_year: ['', [Validators.required, AgeValidator.checkAge]],
      language_ids: [[], Validators.required],
      checkbox: [, Validators.requiredTrue],
    });

    this.stepTwoForm = formBuilder.group({
      email: ['', Validators.email],
      country: [''],
      accent: [''],
      education: [''],
      gender: [''],
    });
  }

  ngOnInit() {
    this.getAllLangs();
  }

  nextStep() {
    this.currentRegisterStep = 2;
  }

  previousStep() {
    this.currentRegisterStep = 1;
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

  async presentServicesAgreement() {
    const popover = await this.modalController.create({
      component: ServicesAgreementComponent,
    });
    return await popover.present();
  }

}
