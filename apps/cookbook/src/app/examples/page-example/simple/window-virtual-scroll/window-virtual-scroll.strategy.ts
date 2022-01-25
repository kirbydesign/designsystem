/* eslint-disable no-underscore-dangle */
import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AutoSizeVirtualScrollStrategy } from './auto-size-virtual-scroll';

export class GenericEventVirtualScrollStrategy extends AutoSizeVirtualScrollStrategy {
  private readonly destroy = new Subject<void>();
  private destroy$: Observable<void>;

  constructor(
    minBufferPx: number,
    maxBufferPx: number,
    private observable$: Observable<any>,
    private getViewportSize: () => number,
    private measureScrollOffset: () => number
  ) {
    super(minBufferPx, maxBufferPx);
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

  /*  updateItemAndBufferSize(itemSize: number, minBufferPx: number, maxBufferPx: number) {
    //super.updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx);
  }*/
}
