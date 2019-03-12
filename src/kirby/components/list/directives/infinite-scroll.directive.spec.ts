import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import { WindowRef } from './../../shared/window-ref/window-ref.service';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

describe('Directive: List', () => {
  const SCROLL_DEBOUNCE_TIME = 100;

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
    function createDirective(
      clientRect: ClientRect,
      windowInnerHeight: number
    ): InfiniteScrollDirective {
      nativeElement.getBoundingClientRect.and.returnValue(clientRect);
      const directive = new InfiniteScrollDirective(
        { nativeElement } as ElementRef,
        { nativeWindow: { innerHeight: windowInnerHeight } } as WindowRef
      );
      spyOn(directive.scrollEnd, 'emit');
      directive.ngAfterViewInit();

      return directive;
    }

    it('should emit event when more then 80% of the element has been scrolled', <any>(
      fakeAsync(() => {
        // the formula used is: (height*0,2) >= bottom - windownInnerHeight.
        const clientRect = { bottom: 887, height: 800 } as ClientRect;
        const windowInnerHeight = 728;
        const directive = createDirective(clientRect, windowInnerHeight);

        directive.onScroll();
        // we need to wait the debounce time.
        tick(SCROLL_DEBOUNCE_TIME);

        expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
      })
    ));

    it('should not emit event when less then 80% of the element has been scrolled', <any>(
      fakeAsync(() => {
        // the formula used is: (height*0,2) >= bottom - windownInnerHeight.
        const clientRect = { bottom: 890, height: 800 } as ClientRect;
        const windowInnerHeight = 728;
        const directive = createDirective(clientRect, windowInnerHeight);

        directive.onScroll();
        // we need to wait the debounce time.
        tick(SCROLL_DEBOUNCE_TIME);

        expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
      })
    ));

    it('should not emit event when it is disabled', <any>fakeAsync(() => {
      // the formula used is: (height*0,2) >= bottom - windownInnerHeight.
      const clientRect = { bottom: 887, height: 800 } as ClientRect;
      const windowInnerHeight = 728;
      const directive = createDirective(clientRect, windowInnerHeight);
      directive.disabled = true;

      directive.onScroll();
      // we need to wait the debounce time.
      tick(SCROLL_DEBOUNCE_TIME);

      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));

    it('should only emit event when debounce time has passed', <any>fakeAsync(() => {
      // the formula used is: (height*0,2) >= bottom - windownInnerHeight.
      const clientRect = { bottom: 887, height: 800 } as ClientRect;
      const windowInnerHeight = 728;
      const directive = createDirective(clientRect, windowInnerHeight);

      directive.onScroll();

      tick(1);
      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();

      tick(SCROLL_DEBOUNCE_TIME);
      expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
    }));

    it('should not emit event after ngDestroy', <any>fakeAsync(() => {
      // the formula used is: (height*0,2) >= bottom - windownInnerHeight.
      const clientRect = { bottom: 887, height: 800 } as ClientRect;
      const windowInnerHeight = 728;
      const directive = createDirective(clientRect, windowInnerHeight);
      directive.ngOnDestroy();

      directive.onScroll();

      tick(SCROLL_DEBOUNCE_TIME);
      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));
  });
});
