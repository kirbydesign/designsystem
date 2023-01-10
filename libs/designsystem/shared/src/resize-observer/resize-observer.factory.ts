import { Injectable } from '@angular/core';
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 * @docs-private
 */
@Injectable({ providedIn: 'root' })
export class ResizeObserverFactory {
  create(callback: ResizeObserverCallback): ResizeObserver | null {
    return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
  }
}
