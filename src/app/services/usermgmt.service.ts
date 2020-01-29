import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NavController} from '@ionic/angular';




@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {
  private dataFromServer:any="";
  private authToken:string;
  private baseUrl = "http://127.0.0.1:8000";

  private httpOptions;
  constructor(public http: HttpClient, public navCtrl: NavController) { } 


  login(dataToSend) {
    let url = this.baseUrl +  "/api/auth/login/";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'authToken'
      })
    };
    
    return this.http.post(url,dataToSend,this.httpOptions).subscribe((dataReturnFromServer: any)=>{
      this.dataFromServer = JSON.stringify(dataReturnFromServer);       
      this.authToken = "Token " + JSON.parse(this.dataFromServer).token;  

      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken); 

      this.navCtrl.navigateForward("speak");
      },(error: any) => {       
        alert("wrong Password or Username")
      });
  }

  logout(){
    let url = this.baseUrl + "/api/auth/logout/";  
  
     
    this.http.post(url, '', this.httpOptions).subscribe(() => {
      this.navCtrl.navigateForward("login");
      console.log("case 2"+ this.authToken);
    });
  }

  public getToken(){
    return this.authToken;
  }
}
