import {TestBed} from '@angular/core/testing';

import {ListenerServiceService} from './listener-service.service';

describe('ListenerServiceService', () => {
  let service: ListenerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
