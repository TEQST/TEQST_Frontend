import { TestBed } from '@angular/core/testing';

import { RecordingUploadService } from './recording-upload.service';

describe('RecordingUploadService', () => {
  let service: RecordingUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordingUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
