import { TextObject } from './../interfaces/text-object';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from '../constants';
import { UsermgmtService } from './usermgmt.service';
import { AuthenticationService } from './authentication.service';

interface User {
  "id": number,
  "username": string,
  "education": string,
  "gender": string,
  "birth_year": number,
  "languages": number[],
  "country": null
}

@Injectable({
  providedIn: 'root'
})

export class ManageFolderService {

  constructor(private http: HttpClient, public authenticationService: AuthenticationService) { 
    this.authenticationService.getAuthToken().subscribe((token) => this.AUTH_TOKEN = token)
  }

  SERVER_URL = Constants.SERVER_URL
  AUTH_TOKEN: string;

  getFolderInfoFor(folderId: string): Observable<object> {
    let url = new URL(`${this.SERVER_URL}/api/folders/${folderId}/`)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getSubfolderListFor(folderId: string): Observable<object> {
    let urlStr = `${this.SERVER_URL}/api/folders/`
    if (folderId) {
      urlStr += folderId + '/';
    }
    let url = new URL(urlStr)
    
    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getTextListFor(folderId: string): Observable<object> {
    let url = new URL(`${this.SERVER_URL}/api/pub/texts/`)
    url.searchParams.append('sharedfolder', folderId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  createFolder(parentId: string, folderName: string) {
    let url = new URL(`${this.SERVER_URL}/api/folders/`)

    return this.http.post(url.toString(),
      {
        parent: parentId,
        name: folderName
      },
      {
        headers:  {
          "Authorization": this.AUTH_TOKEN
        }
      }
    )
  }

  deleteFolder(folderId: string) {
    let url = new URL(`${this.SERVER_URL}/api/folders/${folderId}/`)
    return this.http.delete(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  createText(params: any[]) {
    let formData = new FormData();
    for (let param in params) {
      let paramValue = params[param]
      if (param == 'textfile') {
        formData.append('textfile', paramValue, paramValue.name); 
      } else {
        formData.append(param, paramValue)
      }
    }


    let url = new URL(`${this.SERVER_URL}/api/pub/texts/`)

    return this.http.post(url.toString(),
      formData,
      {
        headers:  {
          "Authorization": this.AUTH_TOKEN,
        }
      } 
    )
  }

  deleteText(textId: string) {
    let url = new URL(`${this.SERVER_URL}/api/pub/texts/${textId}/`)
    return this.http.delete(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getTextInfo(textId: string): Observable<TextObject> {
    let url = new URL(`${this.SERVER_URL}/api/pub/texts/${textId}/`)
    return this.http.get<TextObject>(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getSpeakers(sharedfolderId: number) {
    let url = new URL(`${this.SERVER_URL}/api/sharedfolders/${sharedfolderId}/`)
    return this.http.get<JSON[]>(url.toString(), {
      headers: {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  setSpeakers(sharedfolderId: number, speakers: number[]) {
    let url = new URL(`${this.SERVER_URL}/api/sharedfolders/${sharedfolderId}/`);
    return this.http.put<JSON>(url.toString(), { speaker_ids: speakers }, {
      headers: {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getAllUsers() {
    let url = new URL(`${this.SERVER_URL}/api/users/`)
    return this.http.get<User[]>(url.toString(), {
      headers: {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  downloadFolder(folderId: number): Observable<ArrayBuffer> {
    const url = new URL(`${this.SERVER_URL}/api/download/${folderId}/`);
    return this.http.get<ArrayBuffer>(url.toString(), {
      headers:  {
        Authorization: this.AUTH_TOKEN
      },
      responseType: 'arraybuffer' as 'json'
    });
  }
}

