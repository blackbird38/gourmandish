import { TestBed } from '@angular/core/testing';

import { AuthWebservice } from './auth.webservice';

describe('AuthWebserviceService', () => {
  let service: AuthWebservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthWebservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
