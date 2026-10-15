import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ResizeObserverService, ThemeColorDirective } from '@kirbydesign/designsystem/shared';

export type CardVariant = 'elevated' | 'flat' | 'outlined' | 'base' | 'raised' | 'brand';

const variantSurfaces: Record<CardVariant, string> = {
  elevated: 'raised',
  flat: 'raised',
  outlined: 'base',
  base: 'base',
  raised: 'raised',
  brand: 'brand',
};

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  private themeColor = inject(ThemeColorDirective, { optional: true, self: true });

  @Input() title: string;
  @Input() subtitle: string;

  @HostBinding('style.--kirby-card-background-image')
  _backgroundImage: string;

  @Input()
  set backgroundImageUrl(value: string) {
    this._backgroundImage = `url('${value}')`;
  }

  @Input()
  hasPadding: boolean;

  private sizesSortedByBreakpoint = this.sortSizesByBreakpoint({
    small: 360,
    medium: 720,
    large: 1024,
  });

  @Input()
  set sizes(value: { [size: string]: number }) {
    if (typeof value === 'string') {
      console.error(
        'Sizes property cannot be a string. Please ensure the size property is bound as an expression:\n[sizes]="{...}"'
      );
    }
    this.sizesSortedByBreakpoint = this.sortSizesByBreakpoint(value);
  }

  /**
   * `base`, `raised` (default) and `brand` set the surface directly.
   * `elevated` and `flat` are raised surfaces, `outlined` is a base surface.
   * A `themeColor` takes precedence over the surface of the variant.
   */
  @Input({ transform: (value: CardVariant | null | undefined) => value ?? 'raised' })
  variant: CardVariant = 'raised';

  @HostBinding('class')
  get hostClasses(): string {
    const surface = this.surface;
    return surface ? `${this.variant} kirby-surface-${surface}` : this.variant;
  }

  // For backwards compatibility, a theme color takes precedence over the variant
  private get surface(): string | null {
    const theme = this.themeColor;
    if (!theme || theme.isDefault) return variantSurfaces[this.variant];

    if (theme.isLight) return 'base';
    if (theme.isWhite) return 'raised';
    if (theme.isPrimary || theme.isSecondary || theme.isTertiary || theme.isDark) return 'brand';
    return null;
  }

  constructor(
    private elementRef: ElementRef,
    private resizeObserverService: ResizeObserverService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.resizeObserverService.observe(this.elementRef, (entry) => this.handleResize(entry));
  }

  ngOnDestroy() {
    this.resizeObserverService.unobserve(this.elementRef);
  }

  private sortSizesByBreakpoint(sizes: { [size: string]: number }): [string, number][] {
    return Object.entries(sizes).sort(this.compareSizesByBreakpoint);
  }

  private compareSizesByBreakpoint(a: [string, number], b: [string, number]): number {
    return a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0;
  }

  private handleResize(entry: ResizeObserverEntry) {
    const sizeAttributeName = 'size';
    const smallestBreakpointName = this.sizesSortedByBreakpoint[0][0];
    const smallestBreakpointWidth = this.sizesSortedByBreakpoint[0][1];
    if (entry.contentRect.width < smallestBreakpointWidth) {
      this.renderer.setAttribute(entry.target, sizeAttributeName, `<${smallestBreakpointName}`);
    } else {
      this.sizesSortedByBreakpoint.forEach(([size, width]) => {
        if (entry.contentRect.width >= width) {
          this.renderer.setAttribute(entry.target, sizeAttributeName, size);
        }
      });
    }
  }
}
