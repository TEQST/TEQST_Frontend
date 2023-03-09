import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ShareFolderService} from 'src/app/services/share-folder.service';
import {BaseComponent} from 'src/app/base-component';
import {LoaderService} from 'src/app/services/loader.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})

export class SpeakPage extends BaseComponent implements OnInit {

  public recentFolders = [];

  constructor(public loaderService: LoaderService,
              private shareFolderService: ShareFolderService,
              private router: Router) {

    super(loaderService);
  }

  ngOnInit(): void {
    this.shareFolderService.getRecentLinks().subscribe(
        (res) => {
          this.recentFolders = res;
        },
        (err) => {
          console.log(err);
        },
    );
  }

  openFolder(id, root_id): void {
    this.router.navigateByUrl(
        '/tabs/speak/link/' + id + '?root=' + root_id);
  }

}
