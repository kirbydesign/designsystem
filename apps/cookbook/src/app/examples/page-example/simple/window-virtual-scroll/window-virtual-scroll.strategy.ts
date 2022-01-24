/* eslint-disable no-underscore-dangle */
import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class GenericEventVirtualScrollStrategy {
  private fixedSizeVirtualScrollStrategy: FixedSizeVirtualScrollStrategy;
  private readonly destroy = new Subject<void>();
  private destroy$: Observable<void>;

  constructor(
    itemSizePx: number,
    minBufferPx: number,
    maxBufferPx: number,
    private observable$: Observable<any>,
    private getViewportSize: () => number,
    private measureScrollOffset: () => number
  ) {
    this.fixedSizeVirtualScrollStrategy = new FixedSizeVirtualScrollStrategy(
      itemSizePx,
      minBufferPx,
      maxBufferPx
    );
    this.destroy$ = this.destroy.asObservable();
  }

  attach(viewport: CdkVirtualScrollViewport) {
    viewport.getViewportSize = this.getViewportSize;
    viewport.measureScrollOffset = this.measureScrollOffset;

    this.fixedSizeVirtualScrollStrategy.attach(viewport);

    this.observable$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.fixedSizeVirtualScrollStrategy['_updateRenderedRange']();
    });
  }

  detach() {
    this.fixedSizeVirtualScrollStrategy.detach();

    this.destroy.next();
    this.destroy.complete();
  }

  updateItemAndBufferSize(itemSize: number, minBufferPx: number, maxBufferPx: number) {
    this.fixedSizeVirtualScrollStrategy.updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx);
  }
}
