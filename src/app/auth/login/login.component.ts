import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public showPassword = false;
  public qParams = {};

  constructor(public navCtrl: NavController,
              public authenticationService: AuthenticationService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const next = this.route.snapshot.queryParamMap.get('next');
    this.qParams = next ? {next} : {};
  }

  // gets Username and Password and calls with those login in UsermgmtService
  performLogin(form): void {
    this.authenticationService.login(form.value);
  }
}
