import { Directive, HostBinding, inject, Input } from '@angular/core';

import { ThemeColorDirective } from './theme-color.directive';

export type Surface = 'base' | 'raised' | 'brand';

/**
 * Applies the surface class (`kirby-surface-base` | `kirby-surface-raised` | `kirby-surface-brand`)
 *
 * For backwards compatibility, a theme color set on the same element takes precedence
 * over the surface input:
 * - `light` maps to `base`
 * - `white` maps to `raised`
 * - `primary`, `secondary`, `tertiary` and `dark` map to `brand`
 */
@Directive({
  selector: '[kirbySurface]',
  standalone: true,
})
export class SurfaceDirective {
  private themeColor = inject(ThemeColorDirective, { optional: true, self: true });

  @Input('kirbySurface') surface: Surface | null = null;

  get resolvedSurface(): Surface | null {
    const theme = this.themeColor;
    if (!theme || theme.isDefault) return this.surface;

    if (theme.isLight) return 'base';
    if (theme.isWhite) return 'raised';
    if (theme.isPrimary || theme.isSecondary || theme.isTertiary || theme.isDark) return 'brand';
    return null;
  }

  @HostBinding('class.kirby-surface-base')
  get isBaseSurface(): boolean {
    return this.resolvedSurface === 'base';
  }

  @HostBinding('class.kirby-surface-raised')
  get isRaisedSurface(): boolean {
    return this.resolvedSurface === 'raised';
  }

  @HostBinding('class.kirby-surface-brand')
  get isBrandSurface(): boolean {
    return this.resolvedSurface === 'brand';
  }
}
