import { Directive, HostBinding, inject, Input } from '@angular/core';

import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

/**
 * Applies the theming-context classes (`kirby-surface-base` | `kirby-surface-brand` |
 * `kirby-surface-raised`) that re-scope Kirby's semantic color tokens for a themed surface.
 *
 * The theme is read from the sibling `ThemeColorDirective` on the *same* card element only
 * (`self: true`). Without `self`, the element-injector lookup would climb the DOM and resolve
 * an ancestor card's `ThemeColorDirective`, causing nested cards to mirror their parent's
 * surface instead of establishing their own. When this card has no `themeColor`, the lookup
 * yields `null` and the card falls back to a raised surface for the elevated/flat variants.
 */
@Directive({
  standalone: true,
})
export class SurfaceDirective {
  private themeColor = inject(ThemeColorDirective, { optional: true, self: true });

  @Input() variant: 'elevated' | 'flat' | 'outlined' = 'elevated';

  @HostBinding('class.kirby-surface-base')
  get isBaseSurface(): boolean {
    const theme = this.themeColor;
    return !!theme && (theme.isDefault || theme.isLight);
  }

  @HostBinding('class.kirby-surface-brand')
  get isBrandSurface(): boolean {
    const theme = this.themeColor;
    return !!theme && (theme.isPrimary || theme.isSecondary || theme.isTertiary || theme.isDark);
  }

  @HostBinding('class.kirby-surface-raised')
  get isRaisedSurface(): boolean {
    // An explicit `white` theme color keeps its raised surface.
    if (this.themeColor) {
      return this.themeColor.isWhite;
    }
    // With no theme color, default to a raised surface for the elevated/flat variants.
    return this.variant !== 'outlined';
  }
}
