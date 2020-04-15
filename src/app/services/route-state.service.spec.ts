import { TestBed } from '@angular/core/testing';

import { RouteStateService } from './route-state.service';

describe('RouteStateService', () => {
  let service: RouteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
