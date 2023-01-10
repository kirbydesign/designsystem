import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { ResizeObserverFactory } from './resize-observer.factory';

@Injectable({ providedIn: 'root' })
export class ResizeObserverService implements OnDestroy {
  // IMPORTANT: Keeps track of the existing ResizeObserver so it can be reused for performance.
  // See: https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/z6ienONUb5A/F5-VcUZtBAAJ
  private observer: ResizeObserver | null;
  private observedElements = new WeakMap<Element, (entry: ResizeObserverEntry) => void>();

  constructor(private _resizeObserverFactory: ResizeObserverFactory) {
    this.observer = this._resizeObserverFactory.create((entries) => this.handleResize(entries));
  }

  observe(
    elementOrRef: Element | ElementRef<Element>,
    action: (entry: ResizeObserverEntry) => void
  ): void {
    const element = elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
    if (!this.observedElements.has(element)) {
      if (this.observer) {
        this.observer.observe(element);
      }
      this.observedElements.set(element, action);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.observedElements = null;
  }

  unobserve(elementOrRef: Element | ElementRef<Element>) {
    const element = elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
    if (this.observedElements.has(element)) {
      if (this.observer) {
        this.observer.unobserve(element);
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
