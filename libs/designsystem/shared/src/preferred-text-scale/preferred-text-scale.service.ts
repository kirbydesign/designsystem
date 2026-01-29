import { Injectable, OnDestroy } from '@angular/core';

const TEXT_SCALE_THRESHOLD = 1.35;
const BASE_REM_PX = 16;
const TEXT_SCALE_CLASS = 'kirby-text-scale-135';

/**
 * Polyfill for `env(preferred-text-scale)` from the CSS Environment Variables spec.
 * @see https://drafts.csswg.org/css-env-1/#preferred-text-scale
 *
 * Detects when text is scaled above 135% in browser/OS settings and toggles a
 * `kirby-text-scale-135` class on the root html element.
 *
 * Uses a `ResizeObserver` on a hidden rem-sized sentinel element for reactive
 * detection — when the user changes text size, the element's pixel size changes,
 * triggering the observer.
 *
 * @example
 * ```scss
 * @include utils.media('<medium') {
 *   :host-context(.kirby-text-scale-135) {
 *     // Styles for narrow screens with scaled text
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class PreferredTextScaleService implements OnDestroy {
  private resizeObserver: ResizeObserver | null = null;
  private sentinelElement: HTMLElement | null = null;
  private initialized = false;

  initialize(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    this.sentinelElement = document.createElement('div');
    this.sentinelElement.style.cssText =
      'position:absolute;width:1rem;height:1rem;top:-9999px;visibility:hidden;pointer-events:none';
    document.body.appendChild(this.sentinelElement);

    this.resizeObserver = new ResizeObserver(this.updateTextScaleClass);
    this.resizeObserver.observe(this.sentinelElement);

    this.updateTextScaleClass();
    this.initialized = true;
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;

    this.sentinelElement?.remove();
    this.sentinelElement = null;

    this.initialized = false;
  }

  private updateTextScaleClass = (): void => {
    const remInPx = this.sentinelElement?.offsetWidth ?? BASE_REM_PX;
    const scale = remInPx / BASE_REM_PX;
    document.documentElement.classList.toggle(TEXT_SCALE_CLASS, scale > TEXT_SCALE_THRESHOLD);
  };
}
