import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ManageFolderService {

  constructor(private http: HttpClient) { }

  SERVER_URL = 'http://localhost:8000'
  AUTH_TOKEN = 'Token 15eb455f1c1d17fa69fe1738e58046b95b7524be'

  getSubfolderListFor(folderId: string): Observable<object> {
    let url = new URL(this.SERVER_URL + "/api/folders")
    if (folderId) {
      url.searchParams.append('parent', folderId)
    }
    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  getTextList(folderId: string) {
    let url = new URL(this.SERVER_URL + "/api/pub/texts")
    url.searchParams.append('sharedfolder', folderId)

    return this.http.get(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
  }

  createFolder(parentId: string, title: string) {

  }

  deleteFolder(folderId: string) {

  }

  createText(folderId: string, title: string, textContent: string) {

  }

  deleteText(textId: string) {

  }

  getSpeakers(): String[] {
    let speakers = ["Alex", "Kevin", "Anna"];
    return speakers;
  }

  getAllUsers(): String[] {
    let users = ["Ariel", "Marcel", "Alex", "Kevin", "Anna", "Isabelle", "Charline", "Gertrud", "Franz"];
    return users;
  }
}
