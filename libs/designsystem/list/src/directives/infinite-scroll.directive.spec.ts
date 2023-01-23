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
    document.getElementsByTagName.and.returnValue([]);

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

    it('should not emit event after ngDestroy', fakeAsync(() => {
      const directive = createDirective(0.8);
      directive.ngOnDestroy();

      directive.onScroll();

      tick(INFINITE_SCROLL_DEBOUNCE);
      expect(directive.scrollEnd.emit).not.toHaveBeenCalled();
    }));
  });
});
