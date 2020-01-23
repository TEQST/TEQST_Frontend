import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeakTabNavService {

  constructor() { }

  getPublishers() {
    return [
      {
        name: "publisher1"
      },
      {
        name: "publisher2"
      },
      {
        name: "publisher3"
      },
      {
        name: "publisher4"
      }
    ]
  }

  getFoldersByPublisherName(publisher: string) {
    return [
      {
        name: "folder1"
      },
      {
        name: "folder2"
      },
      {
        name: "folder3"
      }
    ]
  }

  getTextsByFolderId(folderId: string) {
    return [
      {
        id: "t554",
        name: "text1"
      },
      {
        id: "t843",
        name: "text2"
      },
      {
        id: "t399",
        name: "text3"
      }
    ]
  }
}
