import {
  Directive,
  AfterViewInit,
  OnDestroy,
  HostListener,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  Inject,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil, filter, map } from 'rxjs/operators';

import { WINDOW_PROVIDER, WINDOW_REF, WindowRef } from '../../shared/window-ref/window-ref.service';
import { Scroll } from './scroll.model';

/**
 * Specify debounce duration in ms
 */
export const INFINITE_SCROLL_DEBOUNCE = 100;

@Directive({
  selector: '[kirbyInfiniteScroll]',
  providers: [WINDOW_PROVIDER],
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

  constructor(private elementRef: ElementRef, @Inject(WINDOW_REF) private windowRef: WindowRef) {}

  ngAfterViewInit(): void {
    if (this.disabled) return;
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

    setTimeout(() => {
      const ionContent = this.elementRef.nativeElement.closest('ion-content');
      if (ionContent) {
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
            this.scrollEnd.emit();
          });
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
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private getScroll(): Scroll {
    const element = this.elementRef.nativeElement as HTMLElement;
    const boundindClientRect = element.getBoundingClientRect();

    const distanceToViewBottom = boundindClientRect.bottom;
    const elementHeight = boundindClientRect.height;
    const viewHeight = this.windowRef.nativeWindow.innerHeight;

    return { distanceToViewBottom, elementHeight, viewHeight };
  }
}
