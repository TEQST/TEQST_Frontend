import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {NavController} from '@ionic/angular';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //'Authorization': 'Token saldfjlsdajlfjf'
  })
};
@Injectable({
  providedIn: 'root'
})


export class UsermgmtService {
  private dataFromServer:any="";
  private authToken:string;
  private baseUrl = "http://127.0.0.1:8000";
  constructor(public http: HttpClient, public navCtrl: NavController) { } 


  login(dataToSend) {
    let url = this.baseUrl +  "/api/auth/login/";
   
    return this.http.post(url,dataToSend,httpOptions).subscribe((dataReturnFromServer: any)=>{
      this.dataFromServer = JSON.stringify(dataReturnFromServer);       
      this.authToken = "Token " + JSON.parse(this.dataFromServer).token;     
      this.navCtrl.navigateForward("speak");
      },(error: any) => {       
        alert("wrong Password or Username")
      });
  }
  public getToken(){
    return this.authToken;
  }
}
