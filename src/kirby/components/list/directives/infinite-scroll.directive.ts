import {
  Directive,
  AfterViewInit,
  OnDestroy,
  HostListener,
  EventEmitter,
  Input,
  Output,
  ElementRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, filter, map } from 'rxjs/operators';

import { Scroll } from './scroll.model';

@Directive({
  selector: '[kirbyInfiniteScroll]',
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
  /**
   * Event that will be triggered when user has scrolled to
   * bottom of the element
   */
  @Output() public scrollEnd = new EventEmitter<void>();

  /**
   * If true then `scrollEnd` event should NOT be emitted
   */
  @Input() public disabled = false;

  /**
   * Emits a new value on element scroll event
   */
  public scroll$: Subject<Scroll> = new Subject<Scroll>();

  /**
   * Completes on component destroy lifecycle event
   * used to unsubscribe from infinite observables
   */
  private ngUnsubscribe$ = new Subject<void>();

  /**
   * An offset from the bottom of the element to trigger
   * `scrollEnd` event
   */
  private offset = 0.8;

  /**
   * Specify debounce duration in ms
   */
  private debounce = 100;

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    /**
     * Subscribe to `scroll$` observable and emit `scrollEnd` event
     * when element scroll position has surpassed the offset.∏
     */
    this.scroll$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(this.debounce),
        filter(() => !this.disabled),
        filter((scroll) => {
          return (
            scroll.elementHeight * (1 - this.offset) >=
            scroll.distanceToViewBottom - scroll.viewHeight
          );
        })
      )
      .subscribe(() => this.scrollEnd.emit());
  }
  /**
   * On element scroll event emit next `scroll$` observable value
   */
  @HostListener('window:scroll')
  public onScroll(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    const boundindClientRect = element.getBoundingClientRect();

    const distanceToViewBottom = boundindClientRect.bottom;
    const elementHeight = boundindClientRect.height;
    const viewHeight = window.innerHeight;

    this.scroll$.next({ distanceToViewBottom, elementHeight, viewHeight });
  }

  /**
   * trigger `ngUnsubscribe` complete on
   * component destroy lifecycle hook
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
