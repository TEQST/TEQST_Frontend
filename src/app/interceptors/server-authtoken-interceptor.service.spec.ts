import { TestBed } from '@angular/core/testing';

import { ServerAuthtokenInterceptorService } from './server-authtoken-interceptor.service';

describe('ServerAuthtokenInterceptorService', () => {
  let service: ServerAuthtokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerAuthtokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
