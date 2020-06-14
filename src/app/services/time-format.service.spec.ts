import { TestBed } from '@angular/core/testing';

import { TimeFormatService } from './time-format.service';

describe('TimeFormatService', () => {
  let service: TimeFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
