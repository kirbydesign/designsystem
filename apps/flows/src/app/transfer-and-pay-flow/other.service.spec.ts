import { TestBed } from '@angular/core/testing';

import { OtherService } from './other.service';

describe('OtherService', () => {
  let service: OtherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
