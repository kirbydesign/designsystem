import { Injectable, Renderer2, RendererStyleFlags2 } from '@angular/core';

@Injectable()
export class LineClampHelper {
  constructor(private renderer: Renderer2) {}

  setLineClamp(el: HTMLElement, maxLines: number): void {
    this.renderer.setStyle(el, '--line-clamp', maxLines, RendererStyleFlags2.DashCase);
    this.renderer.addClass(el, 'kirby-line-clamp');
  }

  setLineHeight(el: HTMLElement, lineHeight: string): void {
    this.renderer.setStyle(el, '--line-height', lineHeight, RendererStyleFlags2.DashCase);
  }
}
