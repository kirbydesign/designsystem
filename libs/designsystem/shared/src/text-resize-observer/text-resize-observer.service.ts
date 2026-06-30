import { Injectable, OnDestroy } from '@angular/core';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

const TEXT_RESIZE_THRESHOLD = parseFloat(DesignTokenHelper.textResizeThreshold());
const TEXT_RESIZE_CLASS = 'kirby-trt';
const BASE_FONT_SIZE_PX = parseInt(DesignTokenHelper.baseFontSizePx());

/**
 * Element width combines both signals: rem scaling (desktop/iOS) and env(preferred-text-scale)
 * (Android). On platforms where env() is unsupported, the fallback `1` makes it a no-op multiplier.
 */
const OBSERVER_ELEMENT_STYLES =
  'position:absolute;width:calc(1rem * env(preferred-text-scale, 1));height:1rem;top:-9999px;visibility:hidden;pointer-events:none';

/**
 * Detects when text is resized above a certain threshold in browser/OS settings and toggles a
 * `kirby-trt` class on the root html element.
 *
 * Uses a `ResizeObserver` on a hidden element sized with `calc(1rem * env(preferred-text-scale, 1))`.
 * This combines two detections into one element:
 *
 * - **rem scaling** — on desktop browsers and iOS, changing text size modifies the root font-size,
 *   which changes `1rem` and triggers the observer.
 *
 * - **`env(preferred-text-scale)`** — on platforms that support this CSS environment variable
 *   (e.g. Android Chrome/WebView), the multiplier reflects the OS/browser text scale factor.
 *   When the user changes font size in system settings, the env value updates and the element resizes.
 *
 * On platforms where `env(preferred-text-scale)` is not supported, the value falls back to `1`,
 * making the width equivalent to `1rem`.
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

    this.resizeObserver = new ResizeObserver(this.onObservedResize);
    this.resizeObserver.observe(this.textResizeObserverElement);

    this.onObservedResize();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.textResizeObserverElement?.remove();
  }

  private onObservedResize = (): void => {
    const widthInPx = this.textResizeObserverElement?.offsetWidth ?? BASE_FONT_SIZE_PX;
    const scale = widthInPx / BASE_FONT_SIZE_PX;
    document.documentElement.classList.toggle(TEXT_RESIZE_CLASS, scale > TEXT_RESIZE_THRESHOLD);
  };
}
