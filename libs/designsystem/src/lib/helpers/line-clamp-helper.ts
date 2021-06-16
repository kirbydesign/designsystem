import { Injectable, Renderer2, RendererStyleFlags2 } from '@angular/core';

const config = Object.freeze({
  className: 'kirby-line-clamp',
  lineClamp: '--line-clamp',
  lineHeight: '--line-height',
});

@Injectable()
export class LineClampHelper {
  constructor(private renderer: Renderer2) {}

  setMaxLines(element: Element, maxLines: number): void {
    this.renderer.setStyle(element, config.lineClamp, maxLines, RendererStyleFlags2.DashCase);
    this.renderer.addClass(element, config.className);
  }

  setLineHeight(element: Element, lineHeight: string): void {
    // Only necessary for the fallback solution to work
    this.renderer.setStyle(element, config.lineHeight, lineHeight, RendererStyleFlags2.DashCase);
  }

  removeLineClamp(element: Element) {
    this.renderer.removeClass(element, config.className);
    this.renderer.removeStyle(element, config.lineClamp);
    this.renderer.removeStyle(element, config.lineHeight);
  }
}
