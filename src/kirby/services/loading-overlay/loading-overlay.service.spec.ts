/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadingOverlayService } from './loading-overlay.service';

describe('Service: LoadingOverlay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingOverlayService]
    });
  });

  it('should ...', inject([LoadingOverlayService], (service: LoadingOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
