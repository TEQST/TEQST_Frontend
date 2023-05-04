import { TestBed } from '@angular/core/testing';

import { TimeframeService } from './timeframe.service';

describe('TimeframeService', () => {
  let service: TimeframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
