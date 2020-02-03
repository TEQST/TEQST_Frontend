import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Constants } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {

  SERVER_URL = Constants.SERVER_URL

  private dataFromServer:any="";
  
  private baseUrl = "http://127.0.0.1:8000";
  private httpOptions; 
  private _is_publisher:boolean; 
  
  private AUTH_TOKEN = new BehaviorSubject<string>("");
  constructor(public http: HttpClient, public navCtrl: NavController) { } 


  login(dataToSend) {
    let url = this.SERVER_URL +  "/api/auth/login/";
       this.reset();
    return this.http.post(url,dataToSend,this.httpOptions).subscribe((dataReturnFromServer: object)=>{
      this._is_publisher = dataReturnFromServer['user']['is_publisher'];      
      this.dataFromServer = JSON.stringify(dataReturnFromServer);       
      
      this.AUTH_TOKEN.next("Token " + JSON.parse(this.dataFromServer).token);  
      this.getauthToken().subscribe((token: any)=>{
        this.AUTH_TOKEN = token;
      });

      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.AUTH_TOKEN); 

      this.navCtrl.navigateForward("speak");
      },(error: any) => {       
        alert("invalid Password or Username")
      });
  }

  register(dataToSend, logInData){
    let url = this.SERVER_URL + "/api/auth/register/";
      this.reset();
    this.http.post(url,dataToSend,this.httpOptions).subscribe(() => {
      this.login(logInData);
    });//TODO error Handling
  }
  updateProfile(dataToSend){
    let url = this.SERVER_URL + "/api/user/";
    return this.http.put(url, dataToSend, this.httpOptions)
     
  }

  logout(){
    let url = this.SERVER_URL + "/api/auth/logout/";   
    this.navCtrl.navigateForward("login");     
    this.http.post(url, '', this.httpOptions).subscribe(() => {
          
    });
  }

  loadContent(){
    let url = this.SERVER_URL + "/api/user/";     
    return this.http.get(url, this.httpOptions);
  }

  getLangs(){
    let url = this.SERVER_URL + "/api/langs/"; 
    return this.http.get(url, this.httpOptions);
  }
  
  private reset(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'authToken'
      })
    }; 
  }

  getIsPublisher(){
    return this._is_publisher
  }
  getauthToken(){
    return this.AUTH_TOKEN.asObservable()
  }
  
}
