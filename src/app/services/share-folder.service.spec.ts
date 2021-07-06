import { TestBed } from '@angular/core/testing';

import { ShareFolderService } from './share-folder.service';

describe('ShareFolderService', () => {
  let service: ShareFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
