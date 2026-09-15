import { Component, effect, Input, signal } from '@angular/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

const activeCopyToken = signal<CopyTokenComponent | null>(null);

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
  @Input() text: string;

  copied = signal(false);

  constructor() {
    effect(() => {
      if (activeCopyToken() !== this) {
        this.copied.set(false);
      }
    });
  }

  copy(cssVarOverride?: string) {
    const value = this.text ?? `var(${cssVarOverride ?? this.cssVar})`;
    navigator.clipboard.writeText(value);
    activeCopyToken.set(this);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
