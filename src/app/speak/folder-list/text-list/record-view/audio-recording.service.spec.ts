import { TestBed } from '@angular/core/testing';

import { AudioRecordingService } from './audio-recording.service';

describe('AudioRecordingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioRecordingService = TestBed.get(AudioRecordingService);
    expect(service).toBeTruthy();
  });
});
