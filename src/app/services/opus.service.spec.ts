import { TestBed } from '@angular/core/testing';

import { OpusService } from './opus.service';

describe('OpusService', () => {
  let service: OpusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
