import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import { WindowRef } from './../../shared/window-ref/window-ref.service';
import { InfiniteScrollDirective, INFINITE_SCROLL_DEBOUNCE } from './infinite-scroll.directive';

describe('InfiniteScrollDirective', () => {
  let nativeElement: any;

  beforeEach(() => {
    nativeElement = jasmine.createSpyObj('nativeElement', ['getBoundingClientRect']);
  });

  it('should create an instance', () => {
    const directive = new InfiniteScrollDirective(null, null);
    directive.ngAfterViewInit();
    expect(directive).toBeTruthy();
  });

  describe('event: scrollEnd', () => {
    function createDirective(scrollPercentage: number): InfiniteScrollDirective {
      const height = 800;
      const bottom = height * (1 - scrollPercentage);
      const viewHeight = 0;

      nativeElement.getBoundingClientRect.and.returnValue({ height, bottom });
      const directive = new InfiniteScrollDirective(
        { nativeElement } as ElementRef,
        { nativeWindow: { innerHeight: viewHeight } } as WindowRef
      );
      spyOn(directive.scrollEnd, 'emit');
      directive.ngAfterViewInit();

      return directive;
    }

    it('should emit event when 80% of the element has been scrolled', fakeAsync(() => {
      const directive = createDirective(0.8);

      directive.onScroll();
      // we need to wait the debounce time.
      tick(INFINITE_SCROLL_DEBOUNCE);

      expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
    }));

    it('should emit event when more then 80% of the element has been scrolled', fakeAsync(() => {
      const directive = createDirective(0.81);

      directive.onScroll();
      // we need to wait the debounce time.
      tick(INFINITE_SCROLL_DEBOUNCE);

      expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
    }));

    it('should not emit event when less then 80% of the element has been scrolled', fakeAsync(() => {
      const directive = createDirective(0.79);

      directive.onScroll();
      // we need to wait the debounce time.
      tick(INFINITE_SCROLL_DEBOUNCE);

      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));

    it('should not emit event when it is disabled', fakeAsync(() => {
      const directive = createDirective(81);
      directive.disabled = true;

      directive.onScroll();
      // we need to wait the debounce time.
      tick(INFINITE_SCROLL_DEBOUNCE);

      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));

    it('should only emit event when debounce time has passed', fakeAsync(() => {
      const directive = createDirective(0.8);

      directive.onScroll();

      tick(1);
      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();

      tick(INFINITE_SCROLL_DEBOUNCE);
      expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
    }));

    it('should not emit event after ngDestroy', fakeAsync(() => {
      const directive = createDirective(0.8);
      directive.ngOnDestroy();

      directive.onScroll();

      tick(INFINITE_SCROLL_DEBOUNCE);
      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));
  });
});
