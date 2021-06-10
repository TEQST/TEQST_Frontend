import {TextObject} from './../interfaces/text-object';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {Constants} from '../constants';
import {Folder} from '../manage/manage.folder';
import streamSaver from 'streamsaver';
import {AlertManagerService} from './alert-manager.service';

interface User {
  'id': number,
  'username': string,
  'education': string,
  'gender': string,
  'birth_year': number,
  'languages': number[],
  'country': null;
}

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

  createFolder(parentId: string, folderName: string) {
    const url = this.SERVER_URL + `/api/folders/`;

    return this.http.post(url,
        {
          parent: parentId,
          name: folderName,
        },
    );
  }

  deleteFolder(folderId: string) {
    const url = this.SERVER_URL + `/api/folders/${folderId}/`;
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


    const url = this.SERVER_URL + `/api/pub/texts/`;

    return this.http.post(url, formData);
  }

  deleteText(textId: string) {
    const url = this.SERVER_URL + `/api/pub/texts/${textId}/`;
    return this.http.delete(url);
  }

  getTextInfo(textId: string): Observable<TextObject> {
    const url = this.SERVER_URL + `/api/pub/texts/${textId}/`;
    return this.http.get<TextObject>(url, {});
  }

  downloadFolder(folder: Folder) {
    const url = this.SERVER_URL + `/api/download/${folder.id}/`;

    const fileName = `${folder.name}_${folder.id}.zip`;
    const fileStream = streamSaver.createWriteStream(fileName);

    const errorTitle = 'Error while processing your download.';
    const errorMsg = 'Please try again later!';

    const options = {
      headers: new Headers({'Authorization': localStorage.getItem('Token')}),
    };
    fetch(url, options)
        .then((res) => {
          const readableStream = res.body;

          if (window.WritableStream && readableStream.pipeTo) {
            return readableStream.pipeTo(fileStream)
                .catch(() => {
                  this.alertManager
                      .showErrorAlertNoRedirection(errorTitle, errorMsg);
                });
          }

          const writer = fileStream.getWriter();

          const reader = res.body.getReader();
          const pump = () => reader.read()
              .then((res) => {
                if (res.done) {
                  writer.close();
                } else {
                  writer.write(res.value).then(pump);
                }
              })
              .catch(() => {
                this.alertManager
                    .showErrorAlertNoRedirection(errorTitle, errorMsg);
              });
          pump();
        })
        .catch(() => {
          this.alertManager.showErrorAlertNoRedirection(
              'No download available',
              'No Speaker has finished a text of the current folder yet. ' +
              'Please try again later.');
        });
  }
}

