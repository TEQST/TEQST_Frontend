import {TestBed} from '@angular/core/testing';

import {RecordingPlaybackService} from './recording-playback.service';

describe('RecordingPlaybackService', () => {
  let service: RecordingPlaybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordingPlaybackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
