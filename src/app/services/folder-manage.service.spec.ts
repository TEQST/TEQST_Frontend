import { TestBed } from '@angular/core/testing';

import { FolderManageService } from './folder-manage.service';

describe('FolderManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FolderManageService = TestBed.get(FolderManageService);
    expect(service).toBeTruthy();
  });
});
