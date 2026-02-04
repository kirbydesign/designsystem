import { Injectable, OnDestroy } from '@angular/core';

const TEXT_SCALE_THRESHOLD = 1.35;
const BASE_REM_IN_PX = 16;
const TEXT_SCALE_CLASS = 'kirby-text-resize';
const OBSERVED_ELEMENT_STYLES =
  'position:absolute;width:1rem;height:1rem;top:-9999px;visibility:hidden;pointer-events:none';

/**
 * Detects when text is resized above 135% in browser/OS settings and toggles a
 * `kirby-text-resize` class on the root html element.
 *
 * Uses a `ResizeObserver` on a hidden rem-sized element. When the user changes text size, the element's pixel size changes,
 * triggering the observer.
 *
 * @example
 * ```scss
 * @include utils.media('<medium') {
 *   :host-context(.kirby-text-resize) {
 *     // Styles for narrow screens with scaled text
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class TextResizeObserverService implements OnDestroy {
  private resizeObserver: ResizeObserver | null = null;
  private observedElement: HTMLElement | null = null;

  initialize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.observedElement = document.createElement('div');
    this.observedElement.style.cssText = OBSERVED_ELEMENT_STYLES;
    document.body.appendChild(this.observedElement);

    this.resizeObserver = new ResizeObserver(this.updateTextScaleClass);
    this.resizeObserver.observe(this.observedElement);

    this.updateTextScaleClass();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.observedElement?.remove();
  }

  private updateTextScaleClass = (): void => {
    const remInPx = this.observedElement?.offsetWidth ?? BASE_REM_IN_PX;
    const scale = remInPx / BASE_REM_IN_PX;
    document.documentElement.classList.toggle(TEXT_SCALE_CLASS, scale > TEXT_SCALE_THRESHOLD);
  };
}
