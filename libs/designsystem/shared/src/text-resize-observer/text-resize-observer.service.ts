import { Injectable, OnDestroy } from '@angular/core';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const TEXT_RESIZE_THRESHOLD = parseFloat(DesignTokenHelper.textResizeThreshold());
const TEXT_RESIZE_CLASS = 'kirby-trt';
const BASE_FONT_SIZE_PX = parseInt(DesignTokenHelper.baseFontSizePx());
const OBSERVER_ELEMENT_STYLES =
  'position:absolute;width:1rem;height:1rem;top:-9999px;visibility:hidden;pointer-events:none';

/**
 * Detects when text is resized above a certain threshold in browser/OS settings and toggles a
 * `kirby-trt` class on the root html element.
 *
 * Uses a `ResizeObserver` on a hidden rem-sized element. When the user changes text size, the element's pixel size changes,
 * triggering the observer.
 *
 * @example
 * ```scss
 * @include utils.media('<medium') {
 *   :host-context(.kirby-trt) {
 *     // Styles for narrow screens with scaled text
 *   }
 * }
 * ```
 *
 * If `env(preferred-text-scale)` from the CSS Environment Variables spec matures,
 * it might replace some of this functionality.
 * @see https://drafts.csswg.org/css-env-1/#preferred-text-scale
 */
@Injectable({ providedIn: 'root' })
export class TextResizeObserverService implements OnDestroy {
  private resizeObserver: ResizeObserver | null = null;
  private textResizeObserverElement: HTMLElement | null = null;

  initialize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.textResizeObserverElement = document.createElement('div');
    this.textResizeObserverElement.style.cssText = OBSERVER_ELEMENT_STYLES;
    document.body.appendChild(this.textResizeObserverElement);

    this.resizeObserver = new ResizeObserver(this.updateTextScaleClass);
    this.resizeObserver.observe(this.textResizeObserverElement);

    this.updateTextScaleClass();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.textResizeObserverElement?.remove();
  }

  private updateTextScaleClass = (): void => {
    const remInPx = this.textResizeObserverElement?.offsetWidth ?? BASE_FONT_SIZE_PX;
    const scale = remInPx / BASE_FONT_SIZE_PX;
    document.documentElement.classList.toggle(TEXT_RESIZE_CLASS, scale > TEXT_RESIZE_THRESHOLD);
  };
}
