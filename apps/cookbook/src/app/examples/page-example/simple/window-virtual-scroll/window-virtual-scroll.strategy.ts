/* eslint-disable no-underscore-dangle */
import {
  CdkVirtualScrollViewport,
  FixedSizeVirtualScrollStrategy,
  VirtualScrollStrategy,
} from '@angular/cdk/scrolling';
import { fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

// This is an adapted version of the original FixedSizeVirtualScrollStrategy
// https://github.com/angular/components/blob/master/src/cdk/scrolling/fixed-size-virtual-scroll.ts
export class WindowVirtualScrollStrategy implements VirtualScrollStrategy {
  get scrolledIndexChange(): Observable<number> {
    return this.fixedSizeVirtualScrollStrategy.scrolledIndexChange;
  }

  // We're working as an adapter
  private fixedSizeVirtualScrollStrategy: FixedSizeVirtualScrollStrategy;

  private destroy$: Observable<void>;

  private get _viewport(): CdkVirtualScrollViewport | null {
    return this.fixedSizeVirtualScrollStrategy['_viewport'];
  }

  private get _itemSizePx(): number {
    return this.fixedSizeVirtualScrollStrategy['_itemSize'];
  }
  private _offsetSizePx: number = 19;

  private get _minBufferPx(): number {
    return this.fixedSizeVirtualScrollStrategy['_minBufferPx'];
  }
  private get _maxBufferPx(): number {
    return this.fixedSizeVirtualScrollStrategy['_maxBufferPx'];
  }

  private get _scrolledIndexChange() {
    return this.fixedSizeVirtualScrollStrategy['_scrolledIndexChange'];
  }

  private readonly destroy = new Subject<void>();
  private scrollTarget = window;
  private event: any;

  constructor(itemSizePx: number, offsetSizePx: number, minBufferPx: number, maxBufferPx: number) {
    this.fixedSizeVirtualScrollStrategy = new FixedSizeVirtualScrollStrategy(
      itemSizePx,
      minBufferPx,
      maxBufferPx
    );
    this._offsetSizePx = offsetSizePx;
    this.destroy$ = this.destroy.asObservable();
  }

  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   */
  attach(viewport: CdkVirtualScrollViewport) {
    this.fixedSizeVirtualScrollStrategy.attach(viewport);

    fromEvent(window, 'ionScroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: any) => {
        this.event = event;
        this._updateRenderedRange();
      });
  }

  /** Detaches this scroll strategy from the currently attached viewport. */
  detach() {
    this.fixedSizeVirtualScrollStrategy.detach();

    this.destroy.next();
    this.destroy.complete();
  }

  /**
   * Update the item size and buffer size.
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  updateItemAndBufferSize(
    itemSize: number,
    _offsetSizePx: number,
    minBufferPx: number,
    maxBufferPx: number
  ) {
    this.fixedSizeVirtualScrollStrategy.updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx);
  }

  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentScrolled() {
    this._updateRenderedRange();
  }

  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  // TODO: what to do about this?
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }

  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentRendered() {
    this.fixedSizeVirtualScrollStrategy.onContentRendered();
  }

  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onRenderedOffsetChanged() {
    this.fixedSizeVirtualScrollStrategy.onRenderedOffsetChanged();
  }

  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    this.fixedSizeVirtualScrollStrategy.scrollToIndex(index, behavior);
  }

  /** Update the viewport's total content size. */
  private _updateTotalContentSize() {
    this.fixedSizeVirtualScrollStrategy['_updateTotalContentSize']();
  }

  /** Update the viewport's rendered range. */
  private _updateRenderedRange() {
    if (!this._viewport) {
      console.log('returning');
      return;
    }

    console.log('this.event:', this.event);
    // Use the window as a reference for viewPort size and offset
    const viewportSize = this.scrollTarget.innerHeight;
    let scrollOffset = this.event ? this.event.detail.scrollTop : this.scrollTarget.pageYOffset;
    console.log('viewportSize:', viewportSize);
    console.log('scrollOffset:', scrollOffset);

    const renderedRange = this._viewport.getRenderedRange();
    const newRange = { start: renderedRange.start, end: renderedRange.end };

    const dataLength = this._viewport.getDataLength();
    // Prevent NaN as result when dividing by zero.
    let firstVisibleIndex = this._itemSizePx > 0 ? scrollOffset / this._itemSizePx : 0;

    // If user scrolls to the bottom of the list and data changes to a smaller list
    if (newRange.end > dataLength) {
      // We have to recalculate the first visible index based on new data length and viewport size.
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSizePx);
      const newVisibleIndex = Math.max(
        0,
        Math.min(firstVisibleIndex, dataLength - maxVisibleItems)
      );

      // If first visible index changed we must update scroll offset to handle start/end buffers
      // Current range must also be adjusted to cover the new position (bottom of new list).
      if (firstVisibleIndex !== newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSizePx;
        newRange.start = Math.floor(firstVisibleIndex);
      }

      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }

    const startBuffer = scrollOffset - newRange.start * this._itemSizePx;
    if (startBuffer < this._minBufferPx && newRange.start !== 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSizePx);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(
        dataLength,
        Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSizePx)
      );
    } else {
      const endBuffer = newRange.end * this._itemSizePx - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end !== dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSizePx);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(
            0,
            Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSizePx)
          );
        }
      }
    }

    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(this._itemSizePx * newRange.start);
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
}
