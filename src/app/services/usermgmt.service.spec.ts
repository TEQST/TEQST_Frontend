import {TestBed} from '@angular/core/testing';

import {UsermgmtService} from './usermgmt.service';

describe('UsermgmtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermgmtService = TestBed.get(UsermgmtService);
    expect(service).toBeTruthy();
  });
});
