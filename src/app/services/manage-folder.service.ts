import {TextObject} from './../interfaces/text-object';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

interface User {
  'id': number,
  'username': string,
  'education': string,
  'gender': string,
  'birth_year': number,
  'languages': number[],
  'country': null
}

@Injectable({
  providedIn: 'root',
})

export class ManageFolderService {

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService) { }


  getFolderInfoFor(folderId: string): Observable<object> {
    const url = `/api/folders/${folderId}/`;

    return this.http.get(url);
  }

  getSubfolderListFor(folderId: string): Observable<object> {
    let url = `/api/folders/`;
    if (folderId) {
      url += folderId + '/';
    }
    return this.http.get(url);
  }

  getTextListFor(folderId: string): Observable<object> {
    const url = `/api/pub/texts/?sharedfolder=${folderId}`;
    return this.http.get(url);
  }

  createFolder(parentId: string, folderName: string) {
    const url = `/api/folders/`;

    return this.http.post(url,
        {
          parent: parentId,
          name: folderName,
        },
    );
  }

  deleteFolder(folderId: string) {
    const url = `/api/folders/${folderId}/`;
    return this.http.delete(url);
  }

  createText(params: any[]) {
    const formData = new FormData();
    for (const param in params) {
      if ({}.hasOwnProperty.call(params, param)) {
        const paramValue = params[param];
        if (param == 'textfile') {
          formData.append('textfile', paramValue, paramValue.name);
        } else {
          formData.append(param, paramValue);
        }
      }
    }


    const url = `/api/pub/texts/`;

    return this.http.post(url, formData);
  }

  deleteText(textId: string) {
    const url = `/api/pub/texts/${textId}/`;
    return this.http.delete(url);
  }

  getTextInfo(textId: string): Observable<TextObject> {
    const url = `/api/pub/texts/${textId}/`;
    return this.http.get<TextObject>(url, { });
  }

  getSpeakers(sharedfolderId: number) {
    const url =
        `/api/sharedfolders/${sharedfolderId}/`;
    return this.http.get<JSON[]>(url);
  }

  setSpeakers(
      sharedfolderId: number,
      speakers: number[],
      public_for_all: boolean) {

    const url = `/api/sharedfolders/${sharedfolderId}/`;
    return this.http.put<JSON>(url, {
      speaker_ids: speakers,
      public: public_for_all});
  }

  getAllUsers() {
    const url = `/api/users/`;
    return this.http.get<User[]>(url);
  }

  downloadFolder(folderId: number): Observable<ArrayBuffer> {
    const url = `/api/download/${folderId}/`;
    return this.http.get<ArrayBuffer>(url, {
      responseType: 'arraybuffer' as 'json',
    });
  }
}

