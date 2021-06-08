import { Injectable, Renderer2, RendererStyleFlags2 } from '@angular/core';

const lineClampConfig = Object.freeze({
  className: 'kirby-line-clamp',
  cssCustomPropertyLineClamp: '--line-clamp',
  cssCustomPropertyLineHeight: '--line-height',
});

@Injectable()
export class LineClampHelper {
  constructor(private renderer: Renderer2) {}

  setLineClamp(element: Element, maxLines: number): void {
    this.renderer.setStyle(
      element,
      lineClampConfig.cssCustomPropertyLineClamp,
      maxLines,
      RendererStyleFlags2.DashCase
    );
    this.renderer.addClass(element, lineClampConfig.className);
  }

  setLineHeight(element: Element, lineHeight: string): void {
    this.renderer.setStyle(
      element,
      lineClampConfig.cssCustomPropertyLineHeight,
      lineHeight,
      RendererStyleFlags2.DashCase
    );
  }

  removeLineClamp(element: Element) {
    this.renderer.removeClass(element, lineClampConfig.className);
    this.renderer.removeStyle(element, lineClampConfig.cssCustomPropertyLineClamp);
    this.renderer.removeStyle(element, lineClampConfig.cssCustomPropertyLineHeight);
  }
}
