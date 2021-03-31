import { TestBed } from '@angular/core/testing';

import { ManageTextUIService } from './manage-text-ui.service';

describe('ManageTextUIService', () => {
  let service: ManageTextUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTextUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
