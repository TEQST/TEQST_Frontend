import { TestBed } from '@angular/core/testing';

import { ServerErrorInterceptorService } from './server-error-interceptor.service';

describe('ServerErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerErrorInterceptorService = TestBed.get(ServerErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
