import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Constants } from '../constants';
import { BehaviorSubject } from 'rxjs';
import { AlertManagerService } from './alert-manager.service'
import { ConditionalExpr } from '@angular/compiler';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {

  SERVER_URL = Constants.SERVER_URL

  private dataFromServer:any="";
  
  
  private httpOptions; 
  private _is_publisher:boolean; 
  
  private AUTH_TOKEN = new BehaviorSubject<string>("");
  
  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    private alertService: AlertManagerService,
    private translate: TranslateService) {

    //gets AuthToken after reload or on init
    this.getAuthToken();
    this.initHeaders();
   }
  


   //login into Website, saving AuthToken local and in localStorage, redirect to speak tab
  login(dataToSend) {
    let url = this.SERVER_URL +  "/api/auth/login/";
       this.reset();
     this.http.post(url,dataToSend,this.httpOptions).subscribe((dataReturnFromServer: object)=>{
      this._is_publisher = dataReturnFromServer['user']['is_publisher'];      
      this.dataFromServer = JSON.stringify(dataReturnFromServer);       
      
      this.AUTH_TOKEN.next("Token " + JSON.parse(this.dataFromServer).token);  
      this.initHeaders();
      localStorage.setItem('Token', this.AUTH_TOKEN.getValue())
      localStorage.setItem('is_Publisher', JSON.stringify(this._is_publisher))
      
      this.navCtrl.navigateForward("speak");
      },(error: any) => {       
        //calls AlertService when server sends error code
        this.alertService.showErrorAlertNoRedirection("Wrong Input","Invalid Password or Username")
      });
  }

  //creates a new User with the sended Data
  register(dataToSend, logInData){
    let url = this.SERVER_URL + "/api/auth/register/";      
    this.http.post(url,dataToSend).subscribe(() => {
      this.login(logInData);
    });
  }

  //notifys the Server about profile changes
  updateProfile(dataToSend){
    let url = this.SERVER_URL + "/api/user/";
    return this.http.put(url, dataToSend, this.httpOptions)     
  }

  //redirect to login, and loging out
  logout(){
    let url = this.SERVER_URL + "/api/auth/logout/";   
    this.navCtrl.navigateForward("login");  
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      this.reset()
      localStorage.clear()   
     
    });
  }

  //gets all the information about the User who is currently logged in
  loadContent(){
    let url = this.SERVER_URL + "/api/user/"; 
    return this.http.get(url, this.httpOptions);
  }

  //returns all speakable Languages created by an admin
  getLangs(){
    let url = this.SERVER_URL + "/api/langs/";   
    return this.http.get(url);
  }
  //resets httpOptions -> no Authtoken after reset
  private reset(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'authtoken'
      })
    }; 
  }

//add AuthToken to httpOptions
  private initHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.AUTH_TOKEN.getValue(),
      })
    }; 
  }
  //returns boolean if a user is a Publisher
  getIsPublisher(){
    this._is_publisher = JSON.parse(localStorage.getItem('is_Publisher'));    
    return this._is_publisher
  }
  //gets the authToken.
  getAuthToken(){
    this.AUTH_TOKEN.next(localStorage.getItem('Token'));
    return this.AUTH_TOKEN.asObservable()
  }

  setMenuLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
