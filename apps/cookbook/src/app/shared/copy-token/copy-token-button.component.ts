import { Component, ElementRef, HostListener, Input } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-copy-token',
  template: `
    <button kirby-button type="button" size="xs" title="Copy var() to clipboard">
      <kirby-icon name="copy" size="xs"></kirby-icon>
    </button>
  `,
  styleUrls: ['./copy-token-button.component.scss'],
  imports: [IconComponent, ButtonComponent],
})
export class CopyTokenButtonComponent {
  @Input() cssVar: string;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  async onClick(event: MouseEvent) {
    event.stopPropagation();
    await navigator.clipboard.writeText(`var(${this.cssVar})`);
    const row = this.el.nativeElement.closest('tr');
    const target = row ? row.querySelectorAll('td')[1] : this.el.nativeElement;
    if (target) {
      target.classList.add('copied');
      window.setTimeout(() => {
        target.classList.remove('copied');
      }, 1500);
    }
  }
}
