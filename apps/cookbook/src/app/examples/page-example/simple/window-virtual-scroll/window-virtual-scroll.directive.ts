/* eslint-disable no-underscore-dangle */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, forwardRef, Input, OnChanges, OnInit } from '@angular/core';

import { WindowVirtualScrollStrategy } from './window-virtual-scroll.strategy';

const factory = (dir: WindowVirtualScrollDirective) => dir._scrollStrategy;

// This is an adapted version of the original CdkFixedSizeVirtualScroll
// https://github.com/angular/components/blob/master/src/cdk/scrolling/fixed-size-virtual-scroll.ts
@Directive({
  selector: 'cdk-virtual-scroll-viewport[windowVirtualScrollStrategy]',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: factory,
      deps: [forwardRef(() => WindowVirtualScrollDirective)],
    },
  ],
})
export class WindowVirtualScrollDirective implements OnChanges, OnInit {
  ngOnInit() {
    console.log('i don initted yo');
  }

  /** The size of the items in the list (in pixels). */
  @Input()
  get itemSizePx(): number {
    return this._itemSizePx;
  }
  set itemSizePx(value: number) {
    this._itemSizePx = coerceNumberProperty(value);
  }
  _itemSizePx = 56;

  /**
   * The minimum amount of buffer rendered beyond the viewport (in pixels).
   * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
   */
  @Input()
  get minBufferPx(): number {
    return this._minBufferPx;
  }
  set minBufferPx(value: number) {
    this._minBufferPx = coerceNumberProperty(value);
  }
  _minBufferPx = 100;

  /**
   * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
   */
  @Input()
  get maxBufferPx(): number {
    return this._maxBufferPx;
  }
  set maxBufferPx(value: number) {
    this._maxBufferPx = coerceNumberProperty(value);
  }
  _maxBufferPx = 200;

  /** The scroll strategy used by this directive. */
  _scrollStrategy: WindowVirtualScrollStrategy = new WindowVirtualScrollStrategy(
    this.itemSizePx,
    this.minBufferPx,
    this.maxBufferPx
  );

  ngOnChanges() {
    this._scrollStrategy.updateItemAndBufferSize(
      this.itemSizePx,
      this.minBufferPx,
      this.maxBufferPx
    );
  }
}
