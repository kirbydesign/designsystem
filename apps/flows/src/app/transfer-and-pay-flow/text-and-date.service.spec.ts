import { TestBed } from '@angular/core/testing';

import { TextAndDateService } from './text-and-date.service';

describe('TextAndDateService', () => {
  let service: TextAndDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAndDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
