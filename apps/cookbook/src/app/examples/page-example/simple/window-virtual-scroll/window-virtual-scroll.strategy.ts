/* eslint-disable no-underscore-dangle */
import {
  CdkVirtualScrollViewport,
  FixedSizeVirtualScrollStrategy,
  VirtualScrollStrategy,
} from '@angular/cdk/scrolling';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// This is an adapted version of the original FixedSizeVirtualScrollStrategy
// https://github.com/angular/components/blob/master/src/cdk/scrolling/fixed-size-virtual-scroll.ts
export class WindowVirtualScrollStrategy {
  get scrolledIndexChange(): Observable<number> {
    return this.fixedSizeVirtualScrollStrategy.scrolledIndexChange;
  }

  // We're working as an adapter
  private fixedSizeVirtualScrollStrategy: FixedSizeVirtualScrollStrategy;

  private destroy$: Observable<void>;

  private readonly destroy = new Subject<void>();
  private scrollTarget = window;
  private event: any;

  constructor(itemSizePx: number, minBufferPx: number, maxBufferPx: number) {
    this.fixedSizeVirtualScrollStrategy = new FixedSizeVirtualScrollStrategy(
      itemSizePx,
      minBufferPx,
      maxBufferPx
    );
    this.destroy$ = this.destroy.asObservable();
  }

  attach(viewport: CdkVirtualScrollViewport) {
    viewport['getViewportSize'] = () => {
      return this.scrollTarget.innerHeight;
    };
    viewport['measureScrollOffset'] = () => {
      return this.event ? this.event.detail.scrollTop : this.scrollTarget.pageYOffset;
    };
    this.fixedSizeVirtualScrollStrategy.attach(viewport);

    const observable$ = fromEvent(window, 'ionScroll');

    observable$.pipe(takeUntil(this.destroy$)).subscribe((event: any) => {
      this.event = event;
      this.fixedSizeVirtualScrollStrategy['_updateRenderedRange']();
    });
  }

  /** Detaches this scroll strategy from the currently attached viewport. */
  detach() {
    this.fixedSizeVirtualScrollStrategy.detach();

    this.destroy.next();
    this.destroy.complete();
  }

  updateItemAndBufferSize(itemSize: number, minBufferPx: number, maxBufferPx: number) {
    this.fixedSizeVirtualScrollStrategy.updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx);
  }
}
