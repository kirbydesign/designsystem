import { ElementRef, NgZone } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { SpyObject } from '@ngneat/spectator';

import { INFINITE_SCROLL_DEBOUNCE, InfiniteScrollDirective } from './infinite-scroll.directive';

describe('InfiniteScrollDirective', () => {
  let nativeElement: SpyObject<any>;
  let document: SpyObject<Document>;

  const createDirective = (
    scrollPercentage: number,
    runNgAfterViewInit = true
  ): InfiniteScrollDirective => {
    const height = 800;
    const bottom = height * (1 - scrollPercentage);
    const viewHeight = 0;

    nativeElement.getBoundingClientRect.and.returnValue({ height, bottom });
    nativeElement.closest.and.returnValue(null);

    const mockNgZone: SpyObject<NgZone> = jasmine.createSpyObj('ngZone', [
      'runOutsideAngular',
      'run',
    ]);

    mockNgZone.run.and.callFake((fn) => fn());
    mockNgZone.runOutsideAngular.and.callFake((fn) => fn());

    const directive = new InfiniteScrollDirective(
      { nativeElement } as ElementRef,
      { nativeWindow: { innerHeight: viewHeight, document: document as Document } } as WindowRef,
      mockNgZone
    );
    spyOn(directive.scrollEnd, 'emit');
    if (runNgAfterViewInit) directive.ngAfterViewInit();

    return directive;
  };

  beforeEach(() => {
    nativeElement = jasmine.createSpyObj('nativeElement', ['getBoundingClientRect', 'closest']);
    document = jasmine.createSpyObj('document', ['getElementsByTagName']);
  });

  it('should create an instance', () => {
    const directive = createDirective(0);
    expect(directive).toBeTruthy();
  });

  describe('event: scrollEnd', () => {
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

    it('should emit event if initalized as disabled and then enabled while more than 80% of the element has been scrolled', fakeAsync(() => {
      const directive = createDirective(81, false);
      directive.disabled = true;
      directive.ngAfterViewInit();

      directive.disabled = false;
      directive.onScroll();
      // we need to wait the debounce time.
      tick(INFINITE_SCROLL_DEBOUNCE);

      expect(directive.scrollEnd.emit).toHaveBeenCalled();
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

    describe('when placed inside ion-content (e.g. in a modal)', () => {
      let scrollElement: HTMLElement;

      const createInIonContent = (listBottom: number, containerBottom: number) => {
        scrollElement = window.document.createElement('div');
        spyOn(scrollElement, 'getBoundingClientRect').and.returnValue({
          bottom: containerBottom,
        } as DOMRect);
        const ionContent = { getScrollElement: () => Promise.resolve(scrollElement) };
        const directive = createDirective(0, false);
        nativeElement.getBoundingClientRect.and.returnValue({ height: 800, bottom: listBottom });
        nativeElement.closest.and.returnValue(ionContent);
        directive.ngAfterViewInit();
        return directive;
      };

      it('should emit event initially when the content is not scrollable', fakeAsync(() => {
        const directive = createInIonContent(500, 600);
        tick();
        tick(INFINITE_SCROLL_DEBOUNCE);

        expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
      }));

      it('should emit event on native scroll of the scroll element', fakeAsync(() => {
        const directive = createInIonContent(2000, 600);
        tick();
        tick(INFINITE_SCROLL_DEBOUNCE);
        expect(directive.scrollEnd.emit).not.toHaveBeenCalled();

        nativeElement.getBoundingClientRect.and.returnValue({ height: 800, bottom: 700 });
        scrollElement.dispatchEvent(new Event('scroll'));
        tick(INFINITE_SCROLL_DEBOUNCE);

        expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
      }));
    });

    describe('checkScrollPosition', () => {
      it('should emit event if element height changed and end is still visible', fakeAsync(() => {
        const directive = createDirective(0.8);
        directive.onScroll();
        tick(INFINITE_SCROLL_DEBOUNCE);

        nativeElement.getBoundingClientRect.and.returnValue({ height: 900, bottom: 100 });
        directive.checkScrollPosition();
        tick();
        tick(INFINITE_SCROLL_DEBOUNCE);

        expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(2);
      }));

      it('should not emit event if element height is unchanged since last emit', fakeAsync(() => {
        const directive = createDirective(0.8);
        directive.onScroll();
        tick(INFINITE_SCROLL_DEBOUNCE);

        directive.checkScrollPosition();
        tick();
        tick(INFINITE_SCROLL_DEBOUNCE);

        expect(directive.scrollEnd.emit).toHaveBeenCalledTimes(1);
      }));
    });

    it('should not emit event after ngDestroy', fakeAsync(() => {
      const directive = createDirective(0.8);
      directive.ngOnDestroy();

      directive.onScroll();

      tick(INFINITE_SCROLL_DEBOUNCE);
      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));
  });
});
