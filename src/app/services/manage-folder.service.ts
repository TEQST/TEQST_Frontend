import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  SERVER_URL = 'http://localhost:8000'
  AUTH_TOKEN = 'Token 4fdf7502a5618eafc29b88ab38463ed6dbf377ea'

  getSubfolderListFor(folderId: string): Observable<object> {
    let url = new URL(this.SERVER_URL + "/api/folders")
    if (folderId) {
      url.searchParams.append('parent', folderId)
    }
    return this.http.get<any[]>(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  getTextList(folderId: string): Observable<object> {
    let url = new URL(this.SERVER_URL + "/api/pub/texts")
    url.searchParams.append('sharedfolder', folderId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  createFolder(parentId: string, folderName: string) {
    let url = new URL(this.SERVER_URL + "/api/folders/")

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
    );
  }

  deleteFolder(folderId: string) {
    let url = new URL(this.SERVER_URL + "/api/folders/" + folderId + "/")
    return this.http.delete(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  createText(folderId: string, title: string, textContent: string) {

  }

  deleteText(textId: string) {

  }

  getSpeakers(sharedfolderId: number) {
    let url = new URL(this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/`)
    return this.http.get<JSON[]>(url.toString(), {
      headers: {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  setSpeakers(sharedfolderId: number, speakers: number[]) {
    let url = new URL(this.SERVER_URL + `/api/sharedfolders/${sharedfolderId}/`);
    return this.http.put<JSON>(url.toString(), { speaker_ids: speakers }, {
      headers: {
        "Authorization": this.AUTH_TOKEN
      }
    })
  }

  getAllUsers() {
    let url = new URL(this.SERVER_URL + "/api/users/")
    return this.http.get<User[]>(url.toString(), {
      headers: {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }
}
