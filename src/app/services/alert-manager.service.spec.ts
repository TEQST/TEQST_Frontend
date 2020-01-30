import { TestBed } from '@angular/core/testing';

import { AlertManagerService } from './alert-manager.service';

describe('AlertManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertManagerService = TestBed.get(AlertManagerService);
    expect(service).toBeTruthy();
  });
});
