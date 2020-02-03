import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {

  SERVER_URL = Constants.SERVER_URL

  private dataFromServer:any="";
  private authToken:string;
  private httpOptions;  

  constructor(public http: HttpClient, public navCtrl: NavController) { } 


  login(dataToSend) {
    let url = this.SERVER_URL +  "/api/auth/login/";
       this.reset();
    return this.http.post(url,dataToSend,this.httpOptions).subscribe((dataReturnFromServer: any)=>{
      this.dataFromServer = JSON.stringify(dataReturnFromServer);       
      this.authToken = "Token " + JSON.parse(this.dataFromServer).token;  
     
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken); 

      this.navCtrl.navigateForward("speak");
      },(error: any) => {       
        alert("wrong Password or Username")
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
  get _authToken():string{
    return this.authToken;
  }
  
}
