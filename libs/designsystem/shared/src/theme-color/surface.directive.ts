import { Directive, HostBinding, inject, Input } from '@angular/core';

import { ThemeColorDirective } from './theme-color.directive';

/**
 * Applies the surface classes (`kirby-surface-base` | `kirby-surface-brand` |
 * `kirby-surface-raised`) that re-scope Kirby's semantic color tokens for a themed surface.
 *
 * This ensures full backwards compatability, but should likely
 * be re-mapped as a component input and replace ThemeColor for surface components.
 */
@Directive({
  standalone: true,
})
export class SurfaceDirective {
  private themeColor = inject(ThemeColorDirective, { optional: true, self: true });

  @Input() variant: 'elevated' | 'flat' | 'outlined' = 'elevated';

  private get hasThemeColor(): boolean {
    return !!this.themeColor && !this.themeColor.isDefault;
  }

  @HostBinding('class.kirby-surface-base')
  get isBaseSurface(): boolean {
    return this.hasThemeColor && this.themeColor.isLight;
  }

  @HostBinding('class.kirby-surface-brand')
  get isBrandSurface(): boolean {
    const theme = this.themeColor;
    return (
      this.hasThemeColor &&
      (theme.isPrimary || theme.isSecondary || theme.isTertiary || theme.isDark)
    );
  }

  @HostBinding('class.kirby-surface-raised')
  get isRaisedSurface(): boolean {
    if (this.hasThemeColor) {
      return this.themeColor.isWhite;
    }
    return this.variant !== 'outlined';
  }
}
