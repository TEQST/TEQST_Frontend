import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, ReplaySubject, of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {
  private dataFromServer:any="";
  private authToken:string;
  private baseUrl = "http://127.0.0.1:8000";
  private httpOptions;
  //private userInformation = new BehaviorSubject<User>();
  

  private username;
  private education;
  private birthyear;
  private gender;
  constructor(public http: HttpClient, public navCtrl: NavController) { } 


  login(dataToSend) {
    let url = this.baseUrl +  "/api/auth/login/";
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
    let url = this.baseUrl + "/api/auth/register/";
      this.reset();//Doesnt work 
    this.http.post(url,dataToSend,this.httpOptions).subscribe(() => {
      this.login(logInData);
    });//TODO error Handling
  }
  updateProfile(dataToSend){
    let url = this.baseUrl + "/api/user/";
    this.http.put(url, dataToSend, this.httpOptions).subscribe(() => {
      //upadate profile Page View- loadContent()
    });
  }

  logout(){
    let url = this.baseUrl + "/api/auth/logout/";       
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      this.navCtrl.navigateForward("login");     
    });
  }

  loadContent(){
    let url = this.baseUrl + "/api/user/"; 
    return this.http.get(url, this.httpOptions);
    //.subscribe((dataReturnFromServer: any) => {
       //this.dataFromServer = JSON.stringify(dataReturnFromServer);
       //this.username = JSON.parse(this.dataFromServer).username;
       
       //this.education = JSON.parse(this.dataFromServer).education;
       //this.gender = JSON.parse(this.dataFromServer).gender;
       //this.birthyear = JSON.parse(this.dataFromServer).birth_year;    
       //wie bekommt man die daten rüber zu profile.page.ts
        
   // });

  }
  
  private reset(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'authToken'
      })
    }; 
  }
  public getToken(){
    return this.authToken;
  }
}
