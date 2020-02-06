import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { UsermgmtService } from './usermgmt.service';

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

  constructor(private http: HttpClient, private usermgmtService: UsermgmtService) { 
    usermgmtService.getAuthToken().subscribe((token) => this.AUTH_TOKEN = token)
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
      urlStr += folderId
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
    });
  }

  createText(folderId: string, title: string, textFile: File) {
    let formData = new FormData(); 
    formData.append('shared_folder', folderId); 
    formData.append('title', title); 
    formData.append('textfile', textFile, textFile.name); 

    let url = new URL(`${this.SERVER_URL}/api/pub/texts/`)

    return this.http.post(url.toString(),
      formData,
      {
        headers:  {
          "Authorization": this.AUTH_TOKEN
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
    });
  }

  getTextInfo(textId: string) {
    let url = new URL(`${this.SERVER_URL}/api/pub/texts/${textId}/`)
    return this.http.get(url.toString(), {
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
}
