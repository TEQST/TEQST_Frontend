import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeakTabNavService {

  constructor(private http: HttpClient) { }

  SERVER_URL = 'http://localhost:8000'
  AUTH_TOKEN = 'Token b81c0b29328e2f247da76fba6dc9d8b628cd6baf'

  getPublisherList() {
    let urlStr = this.SERVER_URL + "/api/publishers/"
    let url = new URL(urlStr)
    
    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getSharedFoldersByPublisher(publisherId: string) {
    let url = new URL(this.SERVER_URL + "/api/sharedfolders")
    url.searchParams.append('publisher', publisherId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  getTextsByFolderId(folderId: string) {
    let url = new URL(this.SERVER_URL + "/api/spk/texts")
    url.searchParams.append('sharedfolder', folderId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }
}
