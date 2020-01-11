import { TestBed } from '@angular/core/testing';

import { TextServiceService } from './text-service.service';

describe('TextServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextServiceService = TestBed.get(TextServiceService);
    expect(service).toBeTruthy();
  });
});
