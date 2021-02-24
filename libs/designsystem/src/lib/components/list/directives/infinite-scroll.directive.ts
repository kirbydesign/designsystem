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
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { WindowRef } from '../../../types/window-ref';

import { Scroll } from './scroll.model';

/**
 * Specify debounce duration in ms
 */
export const INFINITE_SCROLL_DEBOUNCE = 100;

@Directive({
  selector: '[kirbyInfiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  /**
   * Event that will be triggered when the user has scrolled to
   * bottom of the element
   */
  @Output() scrollEnd = new EventEmitter<void>();

  /**
   * If true then {@link scrollEnd} event should NOT be emitted
   */
  _disabled: boolean = false;
  @Input() set disabled(value: boolean) {
    this.checkScroll$Subscription(value);
    this._disabled = value;
  }
  get disabled() {
    return this._disabled;
  }

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

  constructor(private elementRef: ElementRef, private window: WindowRef, private zone: NgZone) {}

  ngAfterViewInit() {
    this.checkScroll$Subscription(this.disabled);
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
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private checkScroll$Subscription(disabled: boolean) {
    if (this.disabled || this.scroll$.observers.length > 0) return;
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
        this.scrollEnd.emit();
      });

    /**
     * Subscribe to the ionScroll event on the ion-content around the list (if any)
     * and emit {@link scrollEnd} event when element scroll position has surpassed the offset.
     */
    setTimeout(() => {
      const ionContent: HTMLElement = this.elementRef.nativeElement.closest('ion-content');
      if (ionContent) {
        // we run the 'ionScroll' event outside angular, as it would trigger change detection on each scroll
        this.zone.runOutsideAngular(() => {
          fromEvent<any>(ionContent, 'ionScroll')
            .pipe(
              takeUntil(this.ngUnsubscribe$),
              debounceTime(INFINITE_SCROLL_DEBOUNCE),
              filter(() => !this.disabled),
              map(() => this.getScroll()),
              filter((scroll) => {
                return (
                  scroll.elementHeight * (1 - this.offset) >=
                  scroll.distanceToViewBottom - scroll.viewHeight
                );
              })
            )
            .subscribe(() => {
              // we make sure to emit the event inside angular again. As we want to show the spinner and need change detection for that.
              this.zone.run(() => this.scrollEnd.emit());
            });
        });
      }
    });
  }

  private getScroll(): Scroll {
    const element = this.elementRef.nativeElement as HTMLElement;
    const boundindClientRect = element.getBoundingClientRect();

    const distanceToViewBottom = boundindClientRect.bottom;
    const elementHeight = boundindClientRect.height;
    const viewHeight = this.window.innerHeight;

    return { distanceToViewBottom, elementHeight, viewHeight };
  }
}
