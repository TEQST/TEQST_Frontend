import { TestBed } from '@angular/core/testing';

import { ManageFolderService } from './manage-folder.service';

describe('MangeFolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageFolderService = TestBed.get(ManageFolderService);
    expect(service).toBeTruthy();
  });
});
