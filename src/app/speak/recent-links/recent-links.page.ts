import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ShareFolderService} from 'src/app/services/share-folder.service';

@Component({
  selector: 'app-recent-links',
  templateUrl: './recent-links.page.html',
  styleUrls: ['./recent-links.page.scss'],
})
export class RecentLinksPage implements OnInit {

  public recentFolders = [];

  constructor(
    private shareFolderService: ShareFolderService,
    private router: Router,
  ) { }

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
