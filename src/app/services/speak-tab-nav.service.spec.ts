import {TestBed} from '@angular/core/testing';

import {SpeakTabNavService} from './speak-tab-nav.service';

describe('SpeakTabNavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeakTabNavService = TestBed.get(SpeakTabNavService);
    expect(service).toBeTruthy();
  });
});
