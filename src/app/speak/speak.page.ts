import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ShareFolderService} from 'src/app/services/share-folder.service';
import {BaseComponent} from '../base-component';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.page.html',
  styleUrls: ['./speak.page.scss'],
})

export class SpeakPage extends BaseComponent implements OnInit {

  public recentFolders = [];

  constructor(
    public loaderService: LoaderService,
    private shareFolderService: ShareFolderService,
    private router: Router,
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.shareFolderService.getRecentLinks().subscribe(
        (res) => {
          console.log(res);
          this.recentFolders = res;
        // TODO assign to this.recentFolders
        },
        (err) => {
          console.log(err);
        },
    );
  }

  openFolder(id, root_id) {
    this.router.navigateByUrl(
        '/tabs/speak/link/' + id + '?root=' + root_id);
  }

}
