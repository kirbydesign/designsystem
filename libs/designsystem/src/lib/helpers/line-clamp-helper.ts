import { Injectable } from '@angular/core';

@Injectable()
export class LineClampHelper {
  setLineClamp(el: HTMLElement, maxLines: number, lineHeight: string): void {
    el.style.setProperty('--line-clamp', `${maxLines}`);
    el.style.setProperty('--line-height', lineHeight);
    el.classList.add('kirby-line-clamp');
  }
}
