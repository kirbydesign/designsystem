import { Component, Input, signal } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-copy-token',
  host: { '[class.copied]': 'copied()' },
  template: `
    <button
      kirby-button
      type="button"
      size="xs"
      noDecoration="true"
      title="Copy var() to clipboard"
      (click)="copy()"
    >
      <kirby-icon [name]="copied() ? 'checkmark-selected' : 'copy'" size="xs"></kirby-icon>
    </button>
  `,
  styleUrls: ['./copy-token.component.scss'],
  imports: [IconComponent, ButtonComponent],
})
export class CopyTokenComponent {
  @Input() cssVar: string;

  copied = signal(false);
  private copiedTimeout = 0;

  copy(cssVarOverride?: string) {
    navigator.clipboard.writeText(`var(${cssVarOverride ?? this.cssVar})`);
    this.copied.set(true);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = window.setTimeout(() => this.copied.set(false), 1500);
  }
}
