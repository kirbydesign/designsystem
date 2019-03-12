import { TestBed, inject } from '@angular/core/testing';

import { ListLoadMoreService } from './list-load-more.service';

describe('Service: Test', () => {
  let service: ListLoadMoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListLoadMoreService],
    });

    service = TestBed.get(ListLoadMoreService);
  });

  it('should ...', inject([ListLoadMoreService], (service: ListLoadMoreService) => {
    expect(service).toBeTruthy();
  }));

  describe('function: handleLoadMore', () => {
    it('load more should stop if no callback is undefined', (done) => {
      service.handleLoadMore(undefined).then((result) => {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('load more should stop if no callback is null', (done) => {
      service.handleLoadMore(null).then((result) => {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('should stop load more if the callback returns false', (done) => {
      const callback = () => Promise.resolve(false);

      service.handleLoadMore(callback).then((result) => {
        expect(result).toBeFalsy();
        done();
      });
    });

    it('should not stop load more if the callback returns true', (done) => {
      const callback = () => Promise.resolve(true);

      service.handleLoadMore(callback).then((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });

    it('should stop load more if the callback rejects', (done) => {
      const callback = () => Promise.reject();

      service.handleLoadMore(callback).then((result) => {
        expect(result).toBeFalsy();
        done();
      });
    });
  });
});
