import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';

const KIRBY_CARD_FLAT_PROPERTY_DEPRECATION_WARNING =
  'Deprecation warning: flat property will be removed from version 10.0. Use variant="flat" instead';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  private _flat: boolean = false;

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
   * @deprecated Using flat is no longer recomended as it is now part of the "variant" option. Will be removed in version 10.0.
   */
  @Input()
  set flat(isFlat: boolean) {
    this._flat = isFlat;
    console.warn(KIRBY_CARD_FLAT_PROPERTY_DEPRECATION_WARNING);
  }

  get flat(): boolean {
    return this._flat;
  }

  @Input()
  variant: 'elevated' | 'flat' | 'outlined' = 'elevated';

  //TODO: remove "flat"-logic from below function in version 10.0
  @HostBinding('class')
  get _cssClass() {
    return [this.variant, this.flat ? 'flat' : ''].filter((cssClass) => !!cssClass);
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
