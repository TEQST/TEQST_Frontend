import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {
  private dataFromServer:any="";
  private authToken:string;
  private baseUrl = "http://127.0.0.1:8000";
  private httpOptions; 
  private _is_publisher:boolean; 

  constructor(public http: HttpClient, public navCtrl: NavController) { } 


  login(dataToSend) {
    let url = this.baseUrl +  "/api/auth/login/";
       this.reset();
    return this.http.post(url,dataToSend,this.httpOptions).subscribe((dataReturnFromServer: object)=>{
      this._is_publisher = dataReturnFromServer['user']['is_publisher'];
      console.log(this.getIsPublisher())
      
      
      this.dataFromServer = JSON.stringify(dataReturnFromServer);       
      this.authToken = "Token " + JSON.parse(this.dataFromServer).token;  
      
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken); 

      this.navCtrl.navigateForward("speak");
      },(error: any) => {       
        alert("invalid Password or Username")
      });
  }

  register(dataToSend, logInData){
    let url = this.baseUrl + "/api/auth/register/";
      this.reset();
    this.http.post(url,dataToSend,this.httpOptions).subscribe(() => {
      this.login(logInData);
    });//TODO error Handling
  }
  updateProfile(dataToSend){
    let url = this.baseUrl + "/api/user/";
    return this.http.put(url, dataToSend, this.httpOptions)
     
  }

  logout(){
    let url = this.baseUrl + "/api/auth/logout/";   
    this.navCtrl.navigateForward("login");     
    this.http.post(url, '', this.httpOptions).subscribe(() => {
          
    });
  }

  loadContent(){
    let url = this.baseUrl + "/api/user/";     
    return this.http.get(url, this.httpOptions);
  }

  getLangs(){
    let url = this.baseUrl + "/api/langs/"; 
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
  getAuthToken():string{
    return this.authToken;
  }

  getIsPublisher(){
    return this._is_publisher
  }
  
}
