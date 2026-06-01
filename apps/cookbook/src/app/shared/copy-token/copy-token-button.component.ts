import { Component, HostListener, Input, signal } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-copy-token',
  host: { '[class.copied]': 'copied()' },
  template: `
    <button kirby-button type="button" size="xs" title="Copy var() to clipboard">
      <kirby-icon [name]="copied() ? 'checkmark-selected' : 'copy'" size="xs"></kirby-icon>
    </button>
  `,
  styleUrls: ['./copy-token-button.component.scss'],
  imports: [IconComponent, ButtonComponent],
})
export class CopyTokenButtonComponent {
  @Input() cssVar: string;

  copied = signal(false);

  private copiedTimeout = 0;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.copy();
  }

  copy(cssVarOverride?: string) {
    navigator.clipboard.writeText(`var(${cssVarOverride ?? this.cssVar})`);
    this.copied.set(true);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = window.setTimeout(() => this.copied.set(false), 1500);
  }
}
