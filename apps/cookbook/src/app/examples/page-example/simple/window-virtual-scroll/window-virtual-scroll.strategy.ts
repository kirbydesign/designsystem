/* eslint-disable no-underscore-dangle */
import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class GenericEventVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
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
    super(itemSizePx, minBufferPx, maxBufferPx);
    this.destroy$ = this.destroy.asObservable();
  }

  attach(viewport: CdkVirtualScrollViewport) {
    viewport.getViewportSize = this.getViewportSize;
    viewport.measureScrollOffset = this.measureScrollOffset;

    super.attach(viewport);

    this.observable$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      super.onContentScrolled();
    });
  }

  detach() {
    super.detach();
    this.destroy.next();
    this.destroy.complete();
  }

  updateItemAndBufferSize(itemSize: number, minBufferPx: number, maxBufferPx: number) {
    super.updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx);
  }
}
