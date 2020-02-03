import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeakTabNavService {

  constructor(private http: HttpClient) { }

  SERVER_URL = 'http://localhost:8000'
  AUTH_TOKEN = 'Token b990a0e71fa3431f48a1056e68b0269a5cc4f699'

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
