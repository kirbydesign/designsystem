import { Injectable } from '@angular/core';

import { ResizeObserverCallback } from './types/resize-observer-callback';

declare const ResizeObserver: {
  prototype: ResizeObserver;
  new (callback: ResizeObserverCallback): ResizeObserver;
};

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
