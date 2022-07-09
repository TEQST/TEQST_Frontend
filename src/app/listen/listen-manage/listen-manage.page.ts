import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from 'src/app/base-component';
import {FolderDetail} from 'src/app/interfaces/folder-detail';
import {TextBasic} from 'src/app/interfaces/text-basic';
import {ListenerService} from 'src/app/services/listener.service';
import {LoaderService} from 'src/app/services/loader.service';

@Component({
  selector: 'app-listen-manage',
  templateUrl: './listen-manage.page.html',
  styleUrls: ['./listen-manage.page.scss'],
})
export class ListenManagePage extends BaseComponent implements OnInit {

  @ViewChild('folderList', {read: ElementRef}) folderList: ElementRef;
  @ViewChild('textList', {read: ElementRef}) textList: ElementRef;

  public currentFolder: FolderDetail;
  public texts: TextBasic[];
  private currentFolderId: string;

  constructor(
    public loaderService: LoaderService,
    private listenerService: ListenerService,
    private route: ActivatedRoute,
  ) {
    super(loaderService);
    this.currentFolder = {
      id: 0,
      name: '',
      owner: 0,
      parent: 0,
      subfolder: [],
      is_sharedfolder: false,
    };
    this.texts = [];
  }

  ngOnInit(): void {
    this.currentFolderId = this.route.snapshot.paramMap.get('folderId');
    this.loadFolderInfo();
  }

  async loadFolderInfo(): Promise<void> {
    this.listenerService.getFolderDetail(this.currentFolderId).subscribe(
        (res) => {
          this.currentFolder = res;
          this.folderList.nativeElement.classList.add('loaded');
          if (this.currentFolder.is_sharedfolder) {
            this.loadTexts();
          }
        }, (err) => {
          alert(err);
        },
    );
  }

  async loadTexts(): Promise<void> {
    this.listenerService.loadContentsOfSharedFolder(this.currentFolderId)
        .subscribe((res) => {
          this.texts = res['texts'];
          console.log(this.texts);
        }, (err) => {
          alert(err);
        });
  }

  openFolderStatsModal(): void {

  }

}
