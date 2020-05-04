import { ElementRef, Injectable, OnDestroy, NgZone } from '@angular/core';

import { ResizeObserver } from './types/resize-observer';
import { ResizeObserverEntry } from './types/resize-observer-entry';
import { ResizeObserverFactory } from './resize-observer.factory';

@Injectable({ providedIn: 'root' })
export class ResizeObserverService implements OnDestroy {
  // IMPORTANT: Keeps track of the existing ResizeObserver so it can be reused for performance.
  // See: https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ
  private observer: ResizeObserver | null;
  private observedElements = new WeakMap<Element, (entry: ResizeObserverEntry) => void>();

  constructor(private _resizeObserverFactory: ResizeObserverFactory, private zone: NgZone) {
    this.observer = this._resizeObserverFactory.create((entries) => this.handleResize(entries));
  }

  observe(
    elementOrRef: Element | ElementRef<Element>,
    action: (entry: ResizeObserverEntry) => void
  ): void {
    const element = elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
    if (!this.observedElements.has(element)) {
      if (this.observer) {
        // IMPORTANT: Has to be run outside the Angular zone, for it to work with ResizeObserver polyfill:
        this.zone.runOutsideAngular(() => {
          this.observer.observe(element);
        });
      }
      this.observedElements.set(element, action);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      // IMPORTANT: Has to be run outside the Angular zone, for it to work with ResizeObserver polyfill:
      this.zone.runOutsideAngular(() => {
        this.observer.disconnect();
      });
    }
    this.observedElements = null;
  }

  unobserve(elementOrRef: Element | ElementRef<Element>) {
    const element = elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
    if (this.observedElements.has(element)) {
      if (this.observer) {
        // IMPORTANT: Has to be run outside the Angular zone, for it to work with ResizeObserver polyfill:
        this.zone.runOutsideAngular(() => {
          this.observer.unobserve(element);
        });
      }
      this.observedElements.delete(element);
    }
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      const action = this.observedElements.get(entry.target);
      if (action) {
        action(entry);
      }
    });
  }
}
