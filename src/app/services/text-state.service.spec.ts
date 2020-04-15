import { TestBed } from '@angular/core/testing';

import { TextStateService } from './text-state.service';

describe('TextStateService', () => {
  let service: TextStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
