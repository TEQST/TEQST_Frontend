import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PublisherTabPage} from './publisher-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PublisherTabPage,
    children: [
      {
        path: 'create-folder',
        loadChildren: () =>
          import('./create-folder/create-folder.module')
              .then( (m) => m.CreateFolderPageModule),
      },
      {
        path: 'upload-text',
        loadChildren: () =>
          import('./upload-text/upload-text.module')
              .then( (m) => m.UploadTextPageModule),
      },
      {
        path: 'share-folder-speaker',
        loadChildren: () =>
          import('./share-folder-speaker/share-folder-speaker.module')
              .then( (m) => m.ShareFolderSpeakerPageModule),
      },
      {
        path: 'share-folder-listener',
        loadChildren: () =>
          import('./share-folder-listener/share-folder-listener.module')
              .then( (m) => m.ShareFolderListenerPageModule),
      },
      {
        path: 'delete-single-folder',
        loadChildren: () =>
          import('./delete-single-folder/delete-single-folder.module')
              .then( (m) => m.DeleteSingleFolderPageModule),
      },
      {
        path: 'delete-multiple-folders',
        loadChildren: () =>
          import('./delete-multiple-folders/delete-multiple-folders.module')
              .then( (m) => m.DeleteMultipleFoldersPageModule),
      },
      {
        path: 'speaker-stats',
        loadChildren: () =>
          import('./speaker-stats/speaker-stats.module')
              .then( (m) => m.SpeakerStatsPageModule),
      },
      {
        path: 'listening-to-speakers',
        loadChildren: () =>
          import('./listening-to-speakers/listening-to-speakers.module')
              .then( (m) => m.ListeningToSpeakersPageModule),
      },
      {
        path: 'download-recordings',
        loadChildren: () =>
          import('./download-recordings/download-recordings.module')
              .then( (m) => m.DownloadRecordingsPageModule),
      },
      {
        path: 'download-statistics',
        loadChildren: () =>
          import('./download-statistics/download-statistics.module')
              .then( (m) => m.DownloadStatisticsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisherTabPageRoutingModule {}
