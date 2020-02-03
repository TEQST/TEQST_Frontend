import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants'

@Injectable({
  providedIn: 'root'
})
export class SpeakTabNavService {

  constructor(private http: HttpClient) { }

  SERVER_URL = Constants.SERVER_URL
  AUTH_TOKEN = 'Token 3eb103bc990fad5f02fd20d3bea3559036723368'

  getPublisherList() {
    let urlStr = this.SERVER_URL + "/api/publishers/"
    let url = new URL(urlStr)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getInfoForPublisher(publisherId: string) {
    let url = new URL(this.SERVER_URL + "/api/publishers/" + publisherId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getInfoForSharedfolder(folderId: string) {
    let url = new URL(this.SERVER_URL + "/api/spk/sharedfolders/" + folderId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }
}
