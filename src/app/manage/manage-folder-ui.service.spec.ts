import { TestBed } from '@angular/core/testing';

import { ManageFolderUIService } from './manage-folder-ui.service';

describe('ManageFolderUIService', () => {
  let service: ManageFolderUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFolderUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
