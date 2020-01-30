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

  getTextListFor(folderId: string): Observable<object> {
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

  createText(folderId: string, title: string, textFile: File) {
    let formData = new FormData(); 
    formData.append('shared_folder', folderId); 
    formData.append('title', title); 
    formData.append('textfile', textFile, textFile.name); 

    let url = new URL(this.SERVER_URL + "/api/pub/texts/")

    return this.http.post(url.toString(),
      formData,
      {
        headers:  {
          "Authorization": this.AUTH_TOKEN
        }
      }
    );
  }

  deleteText(textId: string) {
    let url = new URL(this.SERVER_URL + "/api/pub/texts/" + textId + "/")
    return this.http.delete(url.toString(), {
      headers:  {
        "Authorization": this.AUTH_TOKEN
      }
    });
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
