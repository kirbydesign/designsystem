import { TestBed, inject } from '@angular/core/testing';

import { GridHelperService } from './grid-helper.service';

describe('GridHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridHelperService]
    });
  });

  it('should be created', inject([GridHelperService], (service: GridHelperService) => {
    expect(service).toBeTruthy();
  }));
});
