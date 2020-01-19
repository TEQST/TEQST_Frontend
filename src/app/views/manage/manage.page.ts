import { Component, OnInit } from '@angular/core';
import { FolderManageService } from 'src/app/services/folder-manage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  folderId: string
  folderType: string
  folderName: string
  folders: { id: string; name: string; type: string; }[];
  texts: { id: string; name: string; }[];

  constructor(private folderManageService: FolderManageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {      
    this.folderId = this.route.snapshot.paramMap.get('folderId');
    let folderInfo = this.folderManageService.getFolderInfo(this.folderId)
    this.folderType = folderInfo.type
    this.folderName = folderInfo.name
    if (this.folderType == 'struct') {
      this.folders = this.folderManageService.getSubfolderList(this.folderId)
    } else {
      this.texts = this.folderManageService.getTextList(this.folderId)
    }
  }

}
