import { TestBed } from '@angular/core/testing';

import { ListenerDataService } from './listener-data.service';

describe('ListenerDataService', () => {
  let service: ListenerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
