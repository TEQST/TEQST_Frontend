import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';

import {Constants} from 'src/app/constants';
import {TextObject} from 'src/app/interfaces/text-object';
import {Folder} from 'src/app/manage/manage.folder';
import {AuthenticationService} from './authentication.service';
import {AlertManagerService} from './alert-manager.service';

@Injectable({
  providedIn: 'root',
})

export class ManageFolderService {

  SERVER_URL = Constants.SERVER_URL;

  constructor(
    public authenticationService: AuthenticationService,
    private http: HttpClient,
    private alertManager: AlertManagerService) {}

  getFolderInfoFor(folderId: string): Observable<object> {
    const url = this.SERVER_URL + `/api/pub/folders/${folderId}/`;
    return this.http.get(url);
  }

  getSubfolderListFor(folderId: string): Observable<object> {
    let url = this.SERVER_URL + `/api/pub/folders/`;
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
    const url = this.SERVER_URL + `/api/pub/folders/`;

    return this.http.post(url,
        {
          parent: parentId,
          name: folderName,
        },
    );
  }

  deleteFolder(folderId: string): Observable<object> {
    const url = this.SERVER_URL + `/api/pub/folders/${folderId}/`;
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
          for (var i = 0; i < paramValue.length; i++) {
            formData.append(param, paramValue[i], paramValue[i].name)
          }
        } else {
          formData.append(param, paramValue);
        }
      }
    }
    const url = this.SERVER_URL + `/api/pub/texts/upload-text/`;
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
    const url = this.SERVER_URL + `/api/pub/sharedfolders/${folder.id}/download/`;

    const fileName = `${folder.name}_${folder.id}.zip`;

    this.http.get(url, {responseType: 'blob'}).subscribe((zipData) => {
      const blob = new Blob([zipData], {
        type: 'application/zip',
      });
      // save file locally
      saveAs(blob, fileName);
    },
    () => {
      this.alertManager.showErrorAlertNoRedirection(
          'No download available',
          'No Speaker has finished a text of the current folder yet. ' +
              'Please try again later.');
    },
    );
  }

  downloadStatistics(folder: Folder, role: 'pub' | 'lstn', params): void {
    const url = this.SERVER_URL + 
      `/api/${role}/folders/${folder.id}/stats/`

    let times: string[] = []
    for (const key in params) {
      times.push(params[key])
    }
    times.sort() //Sorts either month_year or start_end

    this.http.get(url, {responseType: 'blob', params: params}).subscribe((statsheet) => {
      saveAs(statsheet, `${folder.name}_${times.join('_')}.xlsx`);
    });
  }
}

