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

  private elementHeightAtLastScrollEnd: number;

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
        this.elementHeightAtLastScrollEnd =
          this.elementRef.nativeElement.getBoundingClientRect().height;
        // emit inside angular, as change detection is needed to show the spinner
        this.zone.run(() => this.scrollEnd.emit());
      });

    setTimeout(async () => {
      const ionContent: HTMLIonContentElement =
        this.elementRef.nativeElement.closest('ion-content');
      if (ionContent) {
        this.scrollContainer = await ionContent.getScrollElement();
        if (this.isDestroyed) return;

        // Native scroll event, as 'ionScroll' requires 'scrollEvents' on ion-content (not set in e.g. modals)
        this.zone.runOutsideAngular(() => {
          fromEvent(this.scrollContainer, 'scroll')
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => this.onScroll());
        });
      }

      if (this.isDestroyed) return;
      this.onScroll();
    });
  }

  /**
   * Re-evaluates the scroll position without a scroll event, e.g. after new items
   * have been loaded or the list items have changed.
   * Emits {@link scrollEnd} if the scroll position has surpassed the offset (or the
   * element does not fill the view), unless the directive is disabled or the element
   * height is unchanged since the last {@link scrollEnd}.
   * The check is delayed by {@link INFINITE_SCROLL_DEBOUNCE} ms to allow the DOM to render.
   */
  checkScrollPosition(): void {
    setTimeout(() => {
      if (this.isDestroyed || this.disabled) return;
      const scroll = this.getScroll();
      if (this.hasElementHeightChangedSinceLastScrollEnd(scroll)) {
        this.scroll$.next(scroll);
      }
    }, INFINITE_SCROLL_DEBOUNCE);
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

  private hasElementHeightChangedSinceLastScrollEnd(scroll: Scroll): boolean {
    return scroll.elementHeight !== this.elementHeightAtLastScrollEnd;
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
