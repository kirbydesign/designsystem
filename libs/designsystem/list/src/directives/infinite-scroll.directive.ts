import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { Scroll } from './scroll.model';

/**
 * Specify debounce duration in ms
 */
export const INFINITE_SCROLL_DEBOUNCE = 100;

@Directive({ selector: '[kirbyInfiniteScroll]' })
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  /**
   * Event that will be triggered when the user has scrolled to
   * bottom of the element
   */
  @Output() scrollEnd = new EventEmitter<void>();

  /**
   * If true then {@link scrollEnd} event should NOT be emitted
   */
  @Input() disabled = false;

  /**
   * Emits a new value on element scroll event
   */
  scroll$: Subject<Scroll> = new Subject<Scroll>();

  /**
   * Completes on component destroy lifecycle event
   * used to unsubscribe from infinite observables
   */
  private ngUnsubscribe$ = new Subject<void>();

  /**
   * An offset from the bottom of the element to trigger {@link scrollEnd} event
   */
  private offset = 0.8;

  private scrollContainer: HTMLElement;

  private heightAtLastEmit: number;

  private isDestroyed = false;

  constructor(
    private elementRef: ElementRef,
    private windowRef: WindowRef,
    private zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    /**
     * Subscribe to {@link scroll$} observable and emit {@link scrollEnd} event
     * when element scroll position has surpassed the offset.
     */
    this.scroll$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(INFINITE_SCROLL_DEBOUNCE),
        filter(() => !this.disabled),
        filter((scroll) => {
          return (
            scroll.elementHeight * (1 - this.offset) >=
            scroll.distanceToViewBottom - scroll.viewHeight
          );
        })
      )
      .subscribe(() => {
        this.heightAtLastEmit = this.elementRef.nativeElement.getBoundingClientRect().height;
        // we make sure to emit the event inside angular. As we want to show the spinner and need change detection for that.
        this.zone.run(() => this.scrollEnd.emit());
      });

    /**
     * Listen to native scroll events on the scroll element of the ion-content around the list (if any).
     * We don't rely on 'ionScroll' as it only emits when 'scrollEvents' is enabled on ion-content,
     * which is not always the case (e.g. inside modals).
     */
    setTimeout(async () => {
      const ionContent = this.elementRef.nativeElement.closest?.('ion-content');
      if (!ionContent) return;

      this.scrollContainer =
        typeof ionContent.getScrollElement === 'function'
          ? await ionContent.getScrollElement()
          : ionContent;

      if (this.isDestroyed || !this.scrollContainer) return;

      // we run the scroll event outside angular, as it would trigger change detection on each scroll
      this.zone.runOutsideAngular(() => {
        fromEvent(this.scrollContainer, 'scroll')
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(() => this.onScroll());
      });

      // Check initial position, in case the content is not scrollable
      this.onScroll();
    });
  }

  /**
   * Re-evaluate the scroll position, e.g. after new items have been loaded.
   * Only emits {@link scrollEnd} if the element height has changed since last emit,
   * to avoid endless loading when no new items are added.
   */
  checkScrollPosition(): void {
    setTimeout(() => {
      if (this.isDestroyed || this.disabled) return;
      const scroll = this.getScroll();
      if (scroll.elementHeight !== this.heightAtLastEmit) {
        this.scroll$.next(scroll);
      }
    });
  }

  /**
   * On element scroll event emit next {@link scroll$} observable value
   */
  @HostListener('window:scroll')
  onScroll(): void {
    if (this.disabled) return;
    const scroll = this.getScroll();
    this.scroll$.next(scroll);
  }

  /**
   * trigger {@link ngUnsubscribe} complete on component destroy lifecycle hook
   */
  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private getScroll(): Scroll {
    const element = this.elementRef.nativeElement as HTMLElement;
    const boundindClientRect = element.getBoundingClientRect();

    const distanceToViewBottom = boundindClientRect.bottom;
    const elementHeight = boundindClientRect.height;
    const viewHeight = this.scrollContainer
      ? this.scrollContainer.getBoundingClientRect().bottom
      : this.windowRef.nativeWindow.innerHeight;

    return { distanceToViewBottom, elementHeight, viewHeight };
  }
}
