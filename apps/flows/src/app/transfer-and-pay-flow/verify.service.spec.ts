import { TestBed } from '@angular/core/testing';

import { VerifyService } from './verify.service';

describe('VerifyService', () => {
  let service: VerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
