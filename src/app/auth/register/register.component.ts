import {AgeValidator} from './../../validators/age';
import {UsernameValidator} from './../../validators/username';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
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
    private usernameValidator: UsernameValidator) {
    this.stepOneForm = formBuilder.group({
      username: ['', Validators.required, usernameValidator.checkUsername.bind(usernameValidator)],
      password: ['', Validators.required],
      birth_year: ['', [Validators.required, AgeValidator.checkAge]],
      language_ids: [[], Validators.required],
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

  get errorControl() {
    return this.stepOneForm.controls;
  }

  performRegister() {
    // combine the value object from the forms into one
    const registrationData = {...this.stepOneForm.value, ...this.stepTwoForm.value};
    // filter out all properties with empty strings so the server accepts the request
    for (const value in registrationData) {
      if (registrationData[value] === '') {
        delete registrationData[value];
      }
    }
    const loginData = (({username, password}) => ({username, password}))(this.stepOneForm.value);
    this.authenticationService.register(registrationData).subscribe(() => {
      this.authenticationService.login(loginData);
    }, (error: any) => {
      this.currentRegisterStep = 1;
      this.alertService.showErrorAlertNoRedirection('Username already exists',
          'A user with that username already exists, please choose another username');
    });
  }

  // sets allLAngs[] to all Languages ever created by an Admin
  getAllLangs() {
    this.languageService.getLangs().subscribe((dataReturnFromServer: any) => {
      this.allLangs = dataReturnFromServer;
    });
  }

}
