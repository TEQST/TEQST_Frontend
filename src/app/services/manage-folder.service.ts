import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import streamSaver from 'streamsaver';
import {AuthenticationService} from './authentication.service';
import {Constants} from '../constants';
import {Folder} from '../manage/manage.folder';
import {AlertManagerService} from './alert-manager.service';
import {TextObject} from './../interfaces/text-object';
import {saveAs} from 'file-saver';


@Injectable({
  providedIn: 'root',
})

export class ManageFolderService {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    private http: HttpClient,
    public authenticationService: AuthenticationService,
    private alertManager: AlertManagerService) { }


  getFolderInfoFor(folderId: string): Observable<object> {
    const url = this.SERVER_URL + `/api/folders/${folderId}/`;

    return this.http.get(url);
  }

  getSubfolderListFor(folderId: string): Observable<object> {
    let url = this.SERVER_URL + `/api/folders/`;
    if (folderId) {
      url += folderId + '/';
    }
    return this.http.get(url);
  }

  getTextListFor(folderId: string): Observable<object> {
    const url = this.SERVER_URL + `/api/pub/texts/?sharedfolder=${folderId}`;
    return this.http.get(url);
  }

  createFolder(parentId: string, folderName: string): Observable<object> {
    const url = this.SERVER_URL + `/api/folders/`;

    return this.http.post(url,
        {
          parent: parentId,
          name: folderName,
        },
    );
  }

  deleteFolder(folderId: string): Observable<object> {
    const url = this.SERVER_URL + `/api/folders/${folderId}/`;
    return this.http.delete(url);
  }

  deleteFolders(folderIds): Observable<object> {
    const url = this.SERVER_URL + `/api/pub/folders/delete/`;
    return this.http.post(url, folderIds);
  }

  createText(params: any[]): Observable<object> {
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


    const url = this.SERVER_URL + `/api/pub/texts/`;

    return this.http.post(url, formData);
  }

  deleteText(textId: string): Observable<object> {
    const url = this.SERVER_URL + `/api/pub/texts/${textId}/`;
    return this.http.delete(url);
  }

  deleteTexts(textIds): Observable<object> {
    const url = this.SERVER_URL + `/api/pub/texts/delete/`;
    return this.http.post(url, textIds);
  }

  getTextInfo(textId: string): Observable<TextObject> {
    const url = this.SERVER_URL + `/api/pub/texts/${textId}/`;
    return this.http.get<TextObject>(url, {});
  }

  downloadFolder(folder: Folder): void {
    const url = this.SERVER_URL + `/api/download/${folder.id}/`;

    const fileName = `${folder.name}_${folder.id}.zip`;

    this.http.get(url, {responseType: 'blob'}).subscribe((zipData) => {
      const blob = new Blob([zipData], {
        type: 'application/zip',
      });
      // save file locally
      saveAs(blob, fileName);
    },
    (error: HttpErrorResponse) => {
      this.alertManager.showErrorAlertNoRedirection(
          'No download available',
          'No Speaker has finished a text of the current folder yet. ' +
              'Please try again later.');
    },
    );
  }
}

