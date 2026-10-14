import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ResizeObserverService, Surface, SurfaceDirective } from '@kirbydesign/designsystem/shared';

export type CardVariant = 'elevated' | 'flat' | 'outlined' | Surface;

const variantSurfaces: Record<CardVariant, Surface> = {
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
  changeDetection: ChangeDetectionStrategy.Eager,
  hostDirectives: [SurfaceDirective],
})
export class CardComponent implements OnInit, OnDestroy {
  private surfaceDirective = inject(SurfaceDirective, { self: true });

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

  private _variant: CardVariant = 'raised';

  /**
   * `base`, `raised` (default) and `brand` set the surface directly.
   * `elevated` and `flat` are raised surfaces, `outlined` is a base surface.
   * A `themeColor` takes precedence over the surface of the variant.
   */
  @HostBinding('class')
  @Input()
  get variant(): CardVariant {
    return this._variant;
  }
  set variant(value: CardVariant) {
    this._variant = value ?? 'raised';
    this.surfaceDirective.surface = variantSurfaces[this._variant];
  }

  constructor(
    private elementRef: ElementRef,
    private resizeObserverService: ResizeObserverService,
    private renderer: Renderer2
  ) {
    this.surfaceDirective.surface = variantSurfaces[this._variant];
  }

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
